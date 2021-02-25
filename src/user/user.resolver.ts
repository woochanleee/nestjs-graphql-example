import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { UserService } from './user.service';

import { UserModel } from './model/user.model';
import { PostModel } from 'src/post/model/post.model';

import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UserProfileInput, UserProfileOutput } from './dto/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { RefreshTokenOutput } from './dto/refresh-token.dto';
import { createSuccessOutput } from 'src/common/dto/success.dto';

import { User } from './user.decorator';
import { Role } from 'src/auth/role.decorator';

import { PostService } from 'src/post/post.service';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Mutation((returns) => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput.email, loginInput.password);
  }

  @Role('ADMIN', 'USER')
  @Query((returns) => UserProfileOutput)
  me(@User() user: UserModel): UserProfileOutput {
    return createSuccessOutput<UserProfileOutput>({
      user,
    });
  }

  @Query((returns) => UserProfileOutput)
  @Role('ALL')
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.findByEmail(userProfileInput.email);
  }

  @Mutation((returns) => EditProfileOutput)
  @Role('ALL')
  async editProfile(
    @User() user: UserModel,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(user.email, editProfileInput);
  }

  @Mutation((returns) => LoginOutput)
  @Role('ALL')
  async refreshToken(@Context() context): Promise<RefreshTokenOutput> {
    return this.userService.refreshToken(context.token);
  }

  @ResolveField((returns) => [PostModel])
  async posts(@Parent() user: UserModel) {
    return (await this.postService.getPosts(user.id)).posts;
  }
}
