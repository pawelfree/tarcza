import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const idToken = sessionStorage.getItem('id_token');

        if (idToken) {
            return true;
        }
        else {
            return this.router.createUrlTree(['/error']);
        }
    }
}
