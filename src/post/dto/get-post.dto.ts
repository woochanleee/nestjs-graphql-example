import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

import { Output } from 'src/common/dto/output.dto';
import { PostModel } from '../model/post.model';

@ArgsType()
export class GetPostInput {
  @Field((type) => Int, { nullable: true })
  id?: number;
}

@ObjectType()
export class GetPostOutput extends Output {
  @Field((type) => PostModel)
  post: PostModel;
}
