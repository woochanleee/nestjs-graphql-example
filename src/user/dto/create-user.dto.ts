import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { Output } from 'src/common/dto/output.dto';
import { UserModel } from '../model/user.model';

@InputType()
export class CreateUserInput extends PickType(UserModel, ['email', 'name']) {
  @Field((type) => String)
  password: string;
}

@ObjectType()
export class CreateUserOutput extends Output {}
