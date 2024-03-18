import { Get, Controller } from '@nestjs/common';
import { Roles, Public, AuthenticatedUser } from 'nest-keycloak-connect';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/public')
  getpublic(): string {
    return `Public - ${this.appService.getHello()}`;
  }

  @Get('/user')
  @Roles({ roles: ['user'] })
  getUser(@AuthenticatedUser() user: any): string {
    return `User: ${user.preferred_username} - ${this.appService.getHello()}`;
  }

  @Get('/admin')
  @Roles({ roles: ['admin'] })
  getAdmin(@AuthenticatedUser() user: any): string {
    return `Admin: ${user.preferred_username} - ${this.appService.getHello()}`;
  }
}
