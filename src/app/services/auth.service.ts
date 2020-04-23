import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";


import { Router } from '@angular/router';
import { WnioskiService } from './wnioski.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable()
export class AuthService implements OnDestroy {

    private loggedIn = new BehaviorSubject<User>(null);
    loggedIn$ = this.loggedIn.asObservable();

    constructor(private router: Router,
        private jwt: JwtHelperService,
        private wnioski: WnioskiService) { }

    private tokenExpirationTimer: any;

    ngOnDestroy() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    zweryfikuj(token: string) {
        return this.jwt.decodeToken(token);
    }

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(_ => {
            localStorage.removeItem('id_token');
            this.router.navigateByUrl('/logout');
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    public logout(redirect: boolean = true) {
        this.loggedIn.next(null);
        this.clearLogoutTimer();
        localStorage.removeItem('id_token');
        if (redirect) { 
            this.router.navigateByUrl('/logout');
        }
    }

    public login(token: string): Observable<boolean> {

        return this.wnioski.zaloguj(token)
            .pipe(
                take(1),
                map(res => {
                    if (res && res.isCompany) {
                        this.setLogoutTimer(30*1000)
                        this.loggedIn.next(res);
                        return true
                    } else {
                        localStorage.removeItem('id_token')
                        this.loggedIn.next(null);
                        return false
                    }
                }),
                catchError(() => of(false)));
    }
}