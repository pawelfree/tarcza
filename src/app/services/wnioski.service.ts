import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Wniosek } from '../models/wniosek';
import { Observable } from 'rxjs';

@Injectable()
export class WnioskiService{
    private apiRoot: string = "http://localhost:3000/";

    constructor(private http: HttpClient) {}

    wszystkieWnioski(): Observable<Array<Wniosek>> {
        return this.http.get<Array<Wniosek>>(this.apiRoot+'wnioski');
    }

    szczegolyWniosku(id: string): Observable<any> {
        return this.http.get(this.apiRoot+'szczegoly/'+id);
    }

    zaloguj(token: string): Observable<any> {
        return this.http.get(this.apiRoot+ 'zaloguj/'+token)
    }
}
