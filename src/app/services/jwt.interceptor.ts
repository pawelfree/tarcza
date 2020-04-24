import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const idToken = localStorage.getItem("id_token");

        // if (idToken) {
        //     const cloned = req.clone({
        //         headers: req.headers.set("Authorization",
        //             "Bearer " + idToken)
        //     });

        //     return next.handle(cloned);
        // }
        // else {
            return next.handle(req).pipe(tap(console.log));
        // }
    }
}