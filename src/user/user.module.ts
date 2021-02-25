import { forwardRef, Module } from '@nestjs/common';

import { PostModule } from 'src/post/post.module';
import { JwtModule } from 'src/jwt/jwt.module';

import { UserResolver } from './user.resolver';

import { UserService } from './user.service';
import { PasswordService } from './password.service';
import { JwtService } from 'src/jwt/jwt.service';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [forwardRef(() => PostModule), JwtModule],
  providers: [
    UserResolver,
    UserService,
    PasswordService,
    JwtService,
    PostService,
  ],
  exports: [UserService, JwtService],
})
export class UserModule {}
