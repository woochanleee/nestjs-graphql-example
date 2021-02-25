import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { createFailureOutput } from 'src/common/dto/failure.dto';
import { createSuccessOutput } from 'src/common/dto/success.dto';

import { CreatePostInput, CreatePostOutput } from './dto/create-post.dto';
import { DeletePostOutput } from './dto/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dto/edit-post.dto';
import { GetPostOutput } from './dto/get-post.dto';
import { GetPostsOutput } from './dto/get-posts.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    authorId: string,
    payload: CreatePostInput,
  ): Promise<CreatePostOutput> {
    try {
      await this.prismaService.post.create({
        data: {
          ...payload,
          authorId,
        },
      });

      return createSuccessOutput<CreatePostOutput>();
    } catch (e) {
      const error: Error = e;
      return createFailureOutput<CreatePostOutput>(error.message);
    }
  }

  async editPost(
    userId: string,
    editPostInput: EditPostInput,
  ): Promise<EditPostOutput> {
    try {
      const { postId, title, content } = editPostInput;

      const post = await this.prismaService.post.findFirst({
        where: { id: postId, authorId: userId },
      });

      if (!post) {
        return createFailureOutput<EditPostOutput>(
          `No yours post found for postId: ${postId}`,
        );
      }

      await this.prismaService.post.update({
        where: {
          id: postId,
        },
        data: {
          title: title ?? post.title,
          content: content ?? post.content,
        },
      });

      return createSuccessOutput<EditPostOutput>();
    } catch (e) {
      const error: Error = e;
      return createFailureOutput(error.message);
    }
  }

  async getPosts(userId?: string): Promise<GetPostsOutput> {
    try {
      return createSuccessOutput<GetPostsOutput>({
        posts: await this.prismaService.post.findMany({
          where: {
            ...(userId
              ? {
                  authorId: userId,
                }
              : {}),
          },
        }),
      });
    } catch (e) {
      const error: Error = e;
      return createFailureOutput<GetPostsOutput>(error.message);
    }
  }

  async findPostById(id: number): Promise<GetPostOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id,
        },
      });

      return createSuccessOutput<GetPostOutput>({ post });
    } catch (e) {
      const error: Error = e;
      return createFailureOutput<GetPostOutput>(error.message);
    }
  }

  async deleteById(id: number): Promise<DeletePostOutput> {
    try {
      const post = await this.prismaService.post.findFirst({
        where: { id },
      });

      if (!post) {
        return createFailureOutput(`No yours post found for postId: ${id}`);
      }

      await this.prismaService.post.delete({
        where: {
          id: id,
        },
      });

      return createSuccessOutput<DeletePostOutput>();
    } catch (e) {
      const error: Error = e;

      return createFailureOutput<DeletePostOutput>(error.message);
    }
  }
}
