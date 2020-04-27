import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wniosek } from '../models/wniosek';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class WnioskiService {
    private apiUrl: string = environment.apiUrl;

    constructor( private http: HttpClient ) { }

    wszystkieWnioski(): Observable<Array<Wniosek>> {
        return this.http.get<Array<Wniosek>>( this.apiUrl + 'getApplicationList', { observe: 'response' } )
            .pipe( map( res => {
                if ( res.status === 200 ) {
                    localStorage.setItem( 'id_token', res.headers.get( 'token' ) );
                    const table = res.body['applications'];
                    table.map( obj => delete obj['errorsPFR'] );
                    return table;
                } else {
                    return [];
                }
            } ) );
    }

    nowyWniosek(): Observable<any> {
        return this.http.get( this.apiUrl + 'getNewApplicationLink' );
    }

    odswiezSesje(): Observable<string> {
        return this.http.get( this.apiUrl + 'refreshToken', { responseType: 'text', observe: 'response' } ).pipe(
            map( res => {
                if ( res.status === 200 ) {
                    return res.body;
                } else {
                    return null;
                }
            } ) );
    }

    zaloguj( token: string ): Observable<User> {
        return this.http.get<User>( this.apiUrl + 'LoginUser/' + token );
    }

    pobierzDokument( id: string ): Observable<string> {
        return this.http.get( this.apiUrl + 'getDocument/' + id, { responseType: 'text', observe: 'response' } )
            .pipe( map( res => {
                if ( res.status === 200 ) {
                    localStorage.setItem( 'id_token', res.headers.get( 'token' ) );
                    return res.body;
                } else {
                    return null;
                }
            } ) );
    }
}
