import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

import { Output } from 'src/common/dto/output.dto';

@ArgsType()
export class DeletePostArgs {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class DeletePostOutput extends Output {}
