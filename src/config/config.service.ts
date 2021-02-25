import { ConfigService as NestConfigService } from '@nestjs/config';

import { Env } from './env.interface';

export class ConfigService extends NestConfigService<Env> {}
