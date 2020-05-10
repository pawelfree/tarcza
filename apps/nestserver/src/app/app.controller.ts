import { Controller, Get, HttpCode, Header, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { applications } from './data';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

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

  @Get('getDocument/:id')
  getDocumentBody(@Res() res: Response) {
    const pa = join(__dirname, '..', '../../dist/apps/nestserver/assets/sample.pdf');
    return res.send(readFileSync(pa).toString('base64'));
  }

  @Get('getDocument/')
  @HttpCode(201)
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=sample.pdf')
  getDocument(@Res() res: Response) {
    const pa = join(__dirname, '..', '../../dist/apps/nestserver/assets/sample.pdf');
    return res.send(readFileSync(pa));
  }

  @Get('getClaimLink/:hash')
  getClaimLink(@Res() response: Response) {
    const losowe = Math.random();
    console.log(losowe);
    if (losowe > 0.5) {
      response.status(200).json({ url: 'http://onet.pl' });
    } else {
      response.status(403).json({InternalStatusCode: 'KOD_BLEDU'});
    }
  }

}
