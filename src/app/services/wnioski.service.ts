import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wniosek } from '../models/wniosek';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable()
export class WnioskiService {
    private apiUrl: string = environment.apiUrl;

    constructor( private http: HttpClient ) { }

    wszystkieWnioski(): Observable<Array<Wniosek>> {
        // const headers = new HttpHeaders( { 'requestId': this.objectID() } )
        return this.http.get<Array<Wniosek>>( this.apiUrl + 'getApplicationList' );
    }

    nowyWniosek(): Observable<any> {

        // const headers = new HttpHeaders( { 'requestId': this.objectID() } )
        return this.http.get( this.apiUrl + 'getNewApplicationLink' );
    }

    zaloguj( token: string ): Observable<User> {
        // const headers = new HttpHeaders( { 'requestId': this.objectID() } )
        return this.http.get<User>( this.apiUrl + 'LoginUser/' + token );
    }
}
