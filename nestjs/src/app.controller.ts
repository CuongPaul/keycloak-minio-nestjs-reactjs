import { Get, Controller } from '@nestjs/common';
import { Roles, Public, AuthenticatedUser } from 'nest-keycloak-connect';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@AuthenticatedUser() user: any): string {
    console.log('user: ', user);

    return this.appService.getHello();
  }

  @Get('/user')
  @Roles({ roles: ['user'] })
  getUser(): string {
    return `User - ${this.appService.getHello()}`;
  }

  @Get('/admin')
  @Roles({ roles: ['admin'] })
  getAdmin(): string {
    return `Admin - ${this.appService.getHello()}`;
  }

  @Public()
  @Get('/public')
  getpublic(): string {
    return `Public - ${this.appService.getHello()}`;
  }
}
