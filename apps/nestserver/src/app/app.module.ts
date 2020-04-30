import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HeaderInterceptor } from './header.interceptor';
import { AppService } from './app.service';

@Module({
  imports: [
    // PassportModule,
    JwtModule.register({ secret: 'JWT_PRIVATE_KEY'}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../dist/apps/tarcza/')
  }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HeaderInterceptor
    }
  ]
})
export class AppModule {}
