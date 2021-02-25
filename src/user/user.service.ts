import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/jwt/jwt.service';
import { PasswordService } from './password.service';

import { LoginOutput } from './dto/login.dto';
import { RefreshTokenOutput } from './dto/refresh-token.dto';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { UserProfileOutput } from './dto/user-profile.dto';
import { createFailureOutput } from 'src/common/dto/failure.dto';

import { JwtPayload } from 'src/jwt/jwt.interface';
import { isUser } from './user.type-guard';
import { createSuccessOutput } from 'src/common/dto/success.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser(payload: CreateUserInput): Promise<CreateUserOutput> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      await this.prismaService.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'USER',
        },
      });

      return createSuccessOutput<CreateUserOutput>();
    } catch (e) {
      const error: Error = e;

      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return createFailureOutput(`Email ${payload.email} already used.`);
      } else {
        return createFailureOutput(error.message);
      }
    }
  }

  async login(email: string, password: string): Promise<LoginOutput> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      return createFailureOutput(`No user found for email: ${email}`);
    }

    const isValidPassword = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      return createFailureOutput('Invalid password');
    }

    return this.generateToken({
      id: user.id,
    });
  }

  async findById(id: string): Promise<UserProfileOutput> {
    const user: unknown = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return createFailureOutput(`No user found for id: ${id}`);
    }

    if (!isUser(user)) {
      return createFailureOutput('Received malformed user');
    }

    return createSuccessOutput<UserProfileOutput>({
      user,
    });
  }

  async findByEmail(email: string): Promise<UserProfileOutput> {
    const user: unknown = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      return createFailureOutput(`No user found for email: ${email}`);
    }

    if (!isUser(user)) {
      return createFailureOutput('Received malformed user');
    }

    return createSuccessOutput<UserProfileOutput>({
      user,
    });
  }

  async editProfile(
    email: string,
    editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const { password } = editProfileInput;
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) {
        return createFailureOutput(`No user found for email: ${email}`);
      }

      await this.prismaService.user.update({
        where: {
          email,
        },
        data: {
          ...editProfileInput,
          password: password
            ? await this.passwordService.hashPassword(password)
            : user.password,
        },
      });

      return createSuccessOutput<EditProfileOutput>();
    } catch (error) {
      return createFailureOutput('Could not update profile.');
    }
  }

  generateToken(payload: JwtPayload): LoginOutput {
    const accessToken = this.jwtService.sign(payload, { type: 'access' });
    const refreshToken = this.jwtService.sign(payload, { type: 'refresh' });

    return createSuccessOutput<LoginOutput>({
      accessToken,
      refreshToken,
    });
  }

  refreshToken(token: string): RefreshTokenOutput {
    try {
      const { id } = this.jwtService.verify(token);
      return this.generateToken({
        id,
      });
    } catch (e) {
      const error: Error = e;
      return createFailureOutput(error.message);
    }
  }
}
