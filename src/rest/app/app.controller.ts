import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { RestConfig } from '../rest-config';
import { AppService } from '../../app.service';

@Controller(RestConfig.appRoute)
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  healthCheck() {
    return this.appService.getHealthCheck();
  }

  @Get(RestConfig.appVersionRoute)
  version(@Req() req: Request) {
    return this.appService.getVersion(req);
  }
}
