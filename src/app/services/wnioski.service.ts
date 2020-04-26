import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wniosek } from '../models/wniosek';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class WnioskiService {
    private apiUrl: string = environment.apiUrl;

    constructor( private http: HttpClient ) { }

    wszystkieWnioski(): Observable<Array<Wniosek>> {
        return this.http.get<Array<Wniosek>>( this.apiUrl + 'getApplicationList' )
        // .pipe( switchMap( res => [] ) );
    }

    nowyWniosek(): Observable<any> {
        return this.http.get( this.apiUrl + 'getNewApplicationLink' );
    }

    zaloguj( token: string ): Observable<User> {
        return this.http.get<User>( this.apiUrl + 'LoginUser/' + token );
    }

    pobierzDokument( id: string ): Observable<string> {
        return this.http.get( this.apiUrl + 'getDocument/' + id, { responseType: 'text' } );
    }
}
