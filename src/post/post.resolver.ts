import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Role } from 'src/auth/role.decorator';
import { UserModel } from 'src/user/model/user.model';
import { User } from 'src/user/user.decorator';
import { UserService } from 'src/user/user.service';

import { CreatePostInput, CreatePostOutput } from './dto/create-post.dto';
import { EditPostInput, EditPostOutput } from './dto/edit-post.dto';
import { DeletePostArgs, DeletePostOutput } from './dto/delete-post.dto';

import { PostModel } from './model/post.model';

import { PostService } from './post.service';
import { GetPostInput, GetPostOutput } from './dto/get-post.dto';
import { GetPostsInput, GetPostsOutput } from './dto/get-posts.dto';

@Resolver((of) => PostModel)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Role('ALL')
  @Mutation((returns) => CreatePostOutput)
  async createPost(
    @User() user: UserModel,
    @Args('input') createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(user.id, createPostInput);
  }

  @Role('ALL')
  @Mutation((returns) => EditPostOutput)
  async editPost(
    @User() user: UserModel,
    @Args('input') editPostInput: EditPostInput,
  ): Promise<EditPostOutput> {
    return this.postService.editPost(user.id, editPostInput);
  }

  @Query((returns) => GetPostsOutput)
  async getPosts(@Args() args: GetPostsInput): Promise<GetPostsOutput> {
    return this.postService.getPosts(args.authorId);
  }

  @Query((returns) => GetPostOutput)
  async getPost(@Args() args: GetPostInput): Promise<GetPostOutput> {
    return this.postService.findPostById(args.id);
  }

  @ResolveField()
  async author(@Parent() post: PostModel) {
    const { user } = await this.userService.findById(post.authorId);
    return user;
  }

  @Mutation((returns) => DeletePostOutput)
  async deletePost(@Args() args: DeletePostArgs): Promise<DeletePostOutput> {
    return this.postService.deleteById(args.id);
  }
}
