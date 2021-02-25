export interface Env {
  MODE: Mode;
  JWT_SECRET_KEY: string;
}

export type Mode = 'production' | 'development' | 'testing';
