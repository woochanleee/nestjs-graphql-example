import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';

import { PostModel } from 'src/post/model/post.model';

import { Role } from '../../graphql/schema';

@InputType('UserInput', { isAbstract: true })
@ObjectType('User')
export class UserModel {
  @Field((type) => String)
  id: string;

  @Field((type) => Date, { name: 'registeredAt' })
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => String)
  email: string;

  @HideField()
  password: string;

  @Field((type) => String, { nullable: true })
  name: string;

  @Field((type) => Role)
  role: Role;

  @Field((type) => [PostModel])
  posts: PostModel[];
}
