import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Output {
  @Field((type) => Boolean)
  ok: boolean;

  @Field((type) => String, { nullable: true })
  error?: string;
}
