import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Output } from 'src/common/dto/output.dto';

@InputType()
export class EditProfileInput {
  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => String, { nullable: true })
  password?: string;
}

@ObjectType()
export class EditProfileOutput extends Output {}
