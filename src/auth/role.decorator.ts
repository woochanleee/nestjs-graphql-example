import { SetMetadata } from '@nestjs/common';

import { Role as UserRole } from '../graphql/schema';

export type AllowedRoles = keyof typeof UserRole | 'ALL';

export const Role = (...roles: AllowedRoles[]) => SetMetadata('roles', roles);
