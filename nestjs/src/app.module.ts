import {
  AuthGuard,
  RoleGuard,
  ResourceGuard,
  KeycloakConnectModule,
} from 'nest-keycloak-connect';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EnvModule } from './modules/env/env.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';
import { KeycloakService } from './modules/keycloak/keycloak.service';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { MinioClientModule } from './modules/minio-client/minio-client.module';
import { GlobalExceptionFilter } from './exception-filters/global-exception.filter';

@Module({
  controllers: [AppController],
  imports: [
    FileUploadModule,
    MinioClientModule,
    EnvModule.register(),
    KeycloakConnectModule.registerAsync({
      imports: [KeycloakModule],
      useExisting: KeycloakService,
    }),
  ],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
