import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { applications } from './data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('LoginUser/:token')
  login() {

    return {
      id: '1234567890',
      isCompany: true,
      userName: 'Paweł Rzewuski',
      token: this.appService.getToken()
    };

  }

  @Get('getApplicationList')
  getApplicationList() {
    return applications;
  }

  @Get('refreshToken')
  refreshToken() {
    return this.appService.getToken();
  }

  @Get('getNewApplicationLink')
  newApllicationLink() {
    return Math.random() > 0.5 ? { url: 'http://stackoverflow.com' } : { url: 'http://medium.com' };
  }

  @Get('getDocument')
  getDocument(){
    
  }
}
