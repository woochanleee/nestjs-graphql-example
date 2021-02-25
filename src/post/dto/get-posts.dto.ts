import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import { Output } from 'src/common/dto/output.dto';
import { PostModel } from '../model/post.model';

@ArgsType()
export class GetPostsInput {
  @Field((type) => String, { nullable: true })
  authorId?: string;
}

@ObjectType()
export class GetPostsOutput extends Output {
  @Field((type) => PostModel, { nullable: true })
  posts: PostModel[];
}
