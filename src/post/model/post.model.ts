import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { UserModel } from 'src/user/model/user.model';

@InputType({ isAbstract: true })
@ObjectType('Post')
export class PostModel {
  @Field((type) => Int)
  id: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  content: string;

  @Field((type) => UserModel)
  author: UserModel;

  @Field((type) => String)
  authorId: string;
}
