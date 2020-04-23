import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const idToken = localStorage.getItem("id_token");

        if (idToken) {
            return true;
        }
        else {
            return this.router.createUrlTree(['/error']);
        }
    }
}