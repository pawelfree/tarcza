import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CacheControlInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cloned = req.clone({
            headers: req.headers.
                set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0').
                set('Pragma', 'no-cache').
                //set('Last-Modified', Date()).
                set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        });
        //console.log(Date());    
        return next.handle(cloned);
    }
}
