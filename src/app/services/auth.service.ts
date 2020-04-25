import { Injectable, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { WnioskiService } from './wnioski.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { LoginResult } from '../models/login.constants';

@Injectable()
export class AuthService implements OnDestroy {

    private loggedIn = new BehaviorSubject<User>( null );
    loggedIn$ = this.loggedIn.asObservable();

    constructor( private router: Router,
        private wnioski: WnioskiService ) { }

    private tokenExpirationTimer: any;

    ngOnDestroy() {
        if ( this.tokenExpirationTimer ) {
            clearTimeout( this.tokenExpirationTimer );
        }
    }

    setLogoutTimer( expirationDuration: number ) {
        this.tokenExpirationTimer = setTimeout( _ => {
            localStorage.removeItem( 'id_token' );
            this.loggedIn.next( null );
            this.router.navigateByUrl( '/logout' );
        }, expirationDuration );
    }

    clearLogoutTimer() {
        if ( this.tokenExpirationTimer ) {
            clearTimeout( this.tokenExpirationTimer );
        }
        this.tokenExpirationTimer = null;
    }

    public logout( redirect: boolean = true ) {
        this.loggedIn.next( null );
        this.clearLogoutTimer();
        localStorage.removeItem( 'id_token' );
        if ( redirect ) {
            this.router.navigateByUrl( '/logout' );
        }
    }

    public login( token: string ): Observable<LoginResult> {
        return this.wnioski.zaloguj( token )
            .pipe(
                take( 1 ),
                map( res => {
                    if ( res && res.token ) {
                        if ( !res.isCompany ) {
                            return LoginResult.PERSON;
                        }
                        var expirationDuration = 10 * 60 * 1000;// this.jwt.getTokenExpirationDate( res.token ).getTime() - new Date().getTime();
                        localStorage.setItem( 'id_token', res.token );
                        this.setLogoutTimer( expirationDuration )
                        this.loggedIn.next( res );
                        return LoginResult.TRUE;
                    } else {
                        localStorage.removeItem( 'id_token' )
                        this.loggedIn.next( null );
                        return LoginResult.FALSE;
                    }
                } ),
                catchError( () => of( LoginResult.ERROR ) ) );
    }
}