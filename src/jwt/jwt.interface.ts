export interface JwtPayload {
  id: string;
}

export interface JwtSignOptions {
  type: 'access' | 'refresh';
}
