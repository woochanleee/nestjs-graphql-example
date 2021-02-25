import { JwtPayload } from './jwt.interface';

export function isJwtPayload(payload: unknown): payload is JwtPayload {
  return payload != null && typeof (payload as JwtPayload)?.id === 'string';
}
