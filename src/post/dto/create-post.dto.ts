import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { Output } from 'src/common/dto/output.dto';
import { PostModel } from '../model/post.model';

@InputType()
export class CreatePostInput extends PickType(PostModel, [
  'title',
  'content',
]) {}

@ObjectType()
export class CreatePostOutput extends Output {}
