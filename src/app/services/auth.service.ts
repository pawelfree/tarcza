import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";


import { Router } from '@angular/router';

@Injectable()
export class AuthService implements OnDestroy {

    constructor(private router: Router,
                private jwt: JwtHelperService) {}

    private tokenExpirationTimer: any;

    ngOnDestroy() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    zweryfikuj(token: string){
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
}
