import * as Joi from 'joi';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class EnvModule {
  static register(): DynamicModule {
    return {
      exports: [],
      module: EnvModule,
      providers: [ConfigService],
      imports: [
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          expandVariables: true,
          validationOptions: { abortEarly: false },
          validationSchema: Joi.object({
            PORT: Joi.number().default(4001),
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
