import { Env } from '../../config/env.interface';

declare namespace NodeJS {
  interface Process {
    env: Env;
  }
}
