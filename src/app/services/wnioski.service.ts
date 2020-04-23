import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wniosek } from '../models/wniosek';
import { Observable } from 'rxjs';

@Injectable()
export class WnioskiService {
    private apiRoot: string = "http://localhost:3000/";

    constructor(private http: HttpClient) { }

    private objectID(): string {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    };

    wszystkieWnioski(): Observable<Array<Wniosek>> {
        return this.http.get<Array<Wniosek>>(this.apiRoot + 'getAllApplicationList');
    }

    nowyWniosek(id: string): Observable<any> {
        const headers = new HttpHeaders({ 'requestId': this.objectID() })       
        return this.http.get(this.apiRoot + 'getNewApplicationLink',{ headers });
    }

    zaloguj(token: string): Observable<any> {
        const headers = new HttpHeaders({ 'requestId': this.objectID() })
        return this.http.get(this.apiRoot + 'loginUser/' + token, { headers });
    }
}
