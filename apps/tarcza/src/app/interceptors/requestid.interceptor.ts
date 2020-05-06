import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { objectID } from '../services/objectid';

@Injectable()
export class RequestIdInterceptor implements HttpInterceptor {
 
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cloned = req.clone({
            headers: req.headers.set('requestId', objectID())
        });

        return next.handle(cloned);
    }
}
