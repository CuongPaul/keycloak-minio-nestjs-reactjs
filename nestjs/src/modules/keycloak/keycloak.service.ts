import {
  TokenValidation,
  PolicyEnforcementMode,
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
} from 'nest-keycloak-connect';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakService implements KeycloakConnectOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      tokenValidation: TokenValidation.ONLINE,
      realm: this.configService.get('KEYCLOAK_REALM'),
      secret: this.configService.get('KEYCLOAK_SECRET'),
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      authServerUrl: this.configService.get('KEYCLOAK_URL'),
      clientId: this.configService.get('KEYCLOAK_CLIENT_ID'),
    };
  }
}
