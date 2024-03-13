import { Module } from '@nestjs/common';

import { KeycloakService } from './keycloak.service';

@Module({
  exports: [KeycloakService],
  providers: [KeycloakService],
})
export class KeycloakModule {}
