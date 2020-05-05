import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { objectID } from './objectid';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }


    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem( 'id_token' );

        if ( idToken ) {
            const cloned = req.clone( {
                headers: req.headers.set( 'Authorization', 'Bearer ' + idToken ).set( 'requestID', objectID() )
            } );

            return next.handle( cloned );
        }
        else {

            const cloned = req.clone( {
                headers: req.headers.set( 'requestID', objectID() )
            } );

            return next.handle( cloned );
        }
    }
}
