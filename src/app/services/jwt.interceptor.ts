import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    private objectID(): string {
        const timestamp = ( new Date().getTime() / 1000 | 0 ).toString( 16 );
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace( /[x]/g, function () {
            return ( Math.random() * 16 | 0 ).toString( 16 );
        } ).toLowerCase();
    };

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem( "id_token" );

        if ( idToken ) {
            const cloned = req.clone( {
                headers: req.headers.set( "Authorization", "Bearer " + idToken ).set( 'requestID', this.objectID() )
            } );

            return next.handle( cloned );
        }
        else {

            const cloned = req.clone( {
                headers: req.headers.set( 'requestID', this.objectID() )
            } );

            return next.handle( cloned );
        }
    }
}
