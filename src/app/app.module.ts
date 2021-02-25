import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import * as Joi from 'joi';

import { Env, Mode } from 'src/config/env.interface';

import { PrismaModule } from 'src/prisma/prisma.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { ConfigService } from 'src/config/config.service';

import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './src/config/.env.development',
      validationSchema: Joi.object<any, Env>({
        MODE: Joi.string()
          .valid('production', 'development', 'testing')
          .required(),
        JWT_SECRET_KEY: Joi.string().valid(),
      }),
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const mode = configService.get<Mode>('MODE');
        const enable = mode !== 'production';

        return {
          typePaths: [join(process.cwd(), 'src/graphql/schema.graphql')],
          definitions: {
            path: join(process.cwd(), 'src/graphql/schema.ts'),
            outputAs: 'class',
          },
          debug: enable,
          playground: enable,
          cors: true,
          context: ({ req }: { req: Request }) => ({
            token: req.headers['authorization']?.split('Bearer ')[1],
          }),
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
