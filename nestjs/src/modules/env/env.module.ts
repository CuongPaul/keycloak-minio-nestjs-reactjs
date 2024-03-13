import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { Module, DynamicModule } from '@nestjs/common';

@Module({})
export class EnvModule {
  static register(): DynamicModule {
    return {
      exports: [],
      providers: [],
      module: EnvModule,
      imports: [
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          expandVariables: true,
          validationOptions: { abortEarly: false },
          validationSchema: Joi.object({
            PORT: Joi.number().default(4001),
            KEYCLOAK_URL: Joi.string().required(),
            KEYCLOAK_REALM: Joi.string().required(),
            KEYCLOAK_SECRET: Joi.string().allow(''),
            KEYCLOAK_CLIENT_ID: Joi.string().required(),
            NODE_ENV: Joi.string()
              .valid('test', 'staging', 'production', 'development')
              .default('development'),
          }),
          envFilePath:
            process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
        }),
      ],
    };
  }
}
