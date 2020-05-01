import { Injectable, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { WnioskiService } from './wnioski.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { LoginResult } from '../models/login.constants';
import { timer } from 'rxjs';

@Injectable()
export class AuthService implements OnDestroy {

    private tokenExpirationTimer: Subscription;
    private stopwatch: Subscription;
    private expirationDuration: number;
    private loggedIn = new BehaviorSubject<User>(null);
    loggedIn$ = this.loggedIn.asObservable();
    private sessionTimer = new BehaviorSubject<number>(0);
    sessionTimer$ = this.sessionTimer.asObservable();

    constructor(private router: Router, private wnioski: WnioskiService) { 
        this.expirationDuration = 0;
    }

    ngOnDestroy() {
        this.clearLogoutTimer();
        this.clearStopwatchTimer();
    }

    setStopwatchTimer() {
        this.stopwatch = timer(0, 1000).subscribe(() => {
            this.expirationDuration = this.expirationDuration - 1000;
            const second = Math.floor(this.expirationDuration / 1000);
            if (second >= 0) {
                this.sessionTimer.next(second);
            } else {
                this.sessionTimer.next(0);
            }
        });
    }

    odswiezSesje() {
        this.wnioski.odswiezSesje().pipe(take(1)).subscribe(res => {
            if (res) {
                this.setToken(res);
            }
        },
            err => console.log('1001'))
    }

    clearStopwatchTimer() {
        if (this.stopwatch) {
            this.stopwatch.unsubscribe();
        }
    }

    setLogoutTimer(expirationDuration: number) {
        this.clearLogoutTimer();
        this.tokenExpirationTimer = timer(expirationDuration).subscribe(() => {
            this.logout(true);
        });
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            this.tokenExpirationTimer.unsubscribe()
        }
        this.tokenExpirationTimer = null;
    }

    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    }

    public setToken(token: string) {
        const tokenExpSec = parseInt(this.parseJwt(token)['exp'], 10);
        if (isNaN(tokenExpSec)) {
            this.expirationDuration = 5 * 60 * 1000;
        } else {
            this.expirationDuration = tokenExpSec * 1000 - new Date().getTime();
        }
        localStorage.setItem('id_token', token);
        this.setLogoutTimer(this.expirationDuration);
    }

    public logout(redirect: boolean = true) {
        this.loggedIn.next(null);
        this.clearLogoutTimer();
        this.clearStopwatchTimer();
        localStorage.removeItem('id_token');
        if (redirect) {
            this.router.navigateByUrl('/logout');
        }
    }

    public login(token: string): Observable<LoginResult> {
        if (!token) {
            return of(LoginResult.FALSE);
        }
        return this.wnioski.zaloguj(token)
            .pipe(
                take(1),
                map(res => {
                    if (res && res.token) {
                        if (!res.isCompany) {
                            return LoginResult.PERSON;
                        }
                        console.log(res.token);
                        this.setToken(res.token);
                        this.setStopwatchTimer();
                        this.loggedIn.next(res);
                        return LoginResult.TRUE;
                    } else {
                        localStorage.removeItem('id_token')
                        this.loggedIn.next(null);
                        return LoginResult.FALSE;
                    }
                }),
                catchError(() => of(LoginResult.ERROR)));
    }
}