import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
