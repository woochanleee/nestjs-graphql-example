import { ObjectType, PartialType } from '@nestjs/graphql';

import { LoginOutput } from './login.dto';

@ObjectType()
export class RefreshTokenOutput extends PartialType(LoginOutput) {}
