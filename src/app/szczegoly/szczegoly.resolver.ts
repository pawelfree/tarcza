import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { WnioskiService } from '../services/wnioski.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class SzczegolyResolver implements Resolve<any> {
    
    constructor(private wnioski : WnioskiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<[{nazwa:string, link: string}]>> {
        if (route.paramMap.has('id')) {
            const id = route.paramMap.get('id');
            return this.wnioski.szczegolyWniosku(id).pipe(
                map(result => of(result.dokumenty))
            );
        } else {
            return of(null);
        };
    }
}
