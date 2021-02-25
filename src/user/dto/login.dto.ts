import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.dto';
import { Output } from 'src/common/dto/output.dto';

@InputType()
export class LoginInput extends CreateUserInput {}

@ObjectType()
export class LoginOutput extends Output {
  @Field((type) => String, { nullable: true })
  accessToken?: string;

  @Field((type) => String, { nullable: true })
  refreshToken?: string;
}
