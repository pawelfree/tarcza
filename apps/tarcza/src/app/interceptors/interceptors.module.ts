import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { RequestIdInterceptor } from './requestid.interceptor';
import { CacheControlInterceptor } from './cachecontrol.interceptor';

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: RequestIdInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CacheControlInterceptor, multi: true }
    ]
})
export class InterceptorsModule {
    constructor() { }
}
