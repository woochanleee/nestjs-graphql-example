import { UserModel } from './model/user.model';
import { Role } from '../graphql/schema';

export function isUser(user: unknown): user is UserModel {
  return user != null && (user as UserModel)?.role in Role;
}
