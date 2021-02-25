import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { isUser } from './user.type-guard';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];

    if (!isUser(user)) {
      throw new TypeError('Received malformed user');
    }

    return user;
  },
);
