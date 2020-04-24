import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wniosek } from '../models/wniosek';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class WnioskiService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    private objectID(): string {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    };

    wszystkieWnioski(): Observable<Array<Wniosek>> {
        const headers = new HttpHeaders({ 'requestId': this.objectID() })   
        return this.http.get<Array<Wniosek>>(this.apiUrl + 'getApplicationList', { headers, observe: 'response' })
            .pipe(map(result => {
                localStorage.setItem('id_token',result.headers['Authorization']);
                return result.body}));
    }

    nowyWniosek(): Observable<any> {

        const headers = new HttpHeaders({ 'requestId': this.objectID() })       
        return this.http.get(this.apiUrl + 'getNewApplicationLink',{ headers , observe: 'response'})
            .pipe(map(result => {
                localStorage.setItem('id_token',result.headers['Authorization']);
                return result.body}));
    }

    zaloguj(token: string): Observable<User> {
        const headers = new HttpHeaders({ 'requestId': this.objectID() })
        return this.http.get<User>(this.apiUrl + 'LoginUser/' + token, { headers });
    }
}
