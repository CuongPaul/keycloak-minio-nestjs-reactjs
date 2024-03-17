import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MinioClientService } from './minio-client.service';

@Module({
  exports: [MinioClientService],
  providers: [ConfigService, MinioClientService],
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          useSSL: false,
          port: config.get('MINIO_PORT'),
          endPoint: config.get('MINIO_ENDPOINT'),
          accessKey: config.get('MINIO_ACCESS_KEY'),
          secretKey: config.get('MINIO_SECRET_KEY'),
        };
      },
    }),
  ],
})
export class MinioClientModule {}
