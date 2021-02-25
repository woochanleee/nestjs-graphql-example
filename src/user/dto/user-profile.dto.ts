import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Output } from 'src/common/dto/output.dto';
import { UserModel } from '../model/user.model';

@ArgsType()
export class UserProfileInput {
  @Field((type) => String)
  email: string;
}

@ObjectType()
export class UserProfileOutput extends Output {
  @Field((type) => UserModel, { nullable: true })
  user?: UserModel;
}
