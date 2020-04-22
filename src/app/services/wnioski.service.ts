import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Wniosek } from '../models/wniosek';
import { Observable } from 'rxjs';

@Injectable()
export class WnioskiService{
    private apiRoot: string = "http://localhost:3000/wnioski";

    constructor(private http: HttpClient) {}

    wszystkieWnioski(): Observable<Wniosek[]> {
        return this.http.get<Array<any>>(this.apiRoot);
    }
}
