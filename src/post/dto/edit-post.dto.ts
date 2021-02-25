import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Output } from 'src/common/dto/output.dto';

@InputType()
export class EditPostInput {
  @Field((type) => Int)
  postId: number;

  @Field((type) => String, { nullable: true })
  title?: string;

  @Field((type) => String, { nullable: true })
  content?: string;
}

@ObjectType()
export class EditPostOutput extends Output {}
