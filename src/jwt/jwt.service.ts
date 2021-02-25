import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { ConfigService } from 'src/config/config.service';
import { JwtPayload, JwtSignOptions } from './jwt.interface';
import { isJwtPayload } from './jwt.type-guard';

@Injectable()
export class JwtService {
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get('JWT_SECRET_KEY');
  }

  sign(payload: JwtPayload, options: JwtSignOptions): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: options.type === 'access' ? '1d' : '7d',
    });
  }

  verify(token: string): JwtPayload {
    const payload: unknown = jwt.verify(token, this.secretKey);
    if (!isJwtPayload(payload)) {
      throw new TypeError('Received malformed payload');
    }
    return payload;
  }
}
