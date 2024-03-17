import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { KeycloakService } from './keycloak.service';

@Module({
  exports: [KeycloakService],
  providers: [KeycloakService, ConfigService],
})
export class KeycloakModule {}
