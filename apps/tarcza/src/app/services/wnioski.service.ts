import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wniosek } from '../models/wniosek';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { map, catchError, tap, finalize, take } from 'rxjs/operators';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Injectable()
export class WnioskiService {
    private apiUrl: string = environment.apiUrl;
    private wnioski = new BehaviorSubject<Array<Wniosek>>([]);
    wnioski$ = this.wnioski.asObservable();
    private loading = new BehaviorSubject<boolean>(false);
    loading$ = this.loading.asObservable();

    constructor(private http: HttpClient) { }

    private wszystkieWnioskiInternal(): Observable<Array<Wniosek>> {
        this.loading.next(true);
        return this.http.get<{ applications: Array<any> }>(this.apiUrl + 'getApplicationList', { observe: 'response' })
            .pipe(
                catchError(err => {
                    console.log('1004');
                    return [];
                }),
                map(res => {
                    if (res.status === 200) {
                        sessionStorage.setItem('id_token', res.headers.get('token'));
                        const table = res.body.applications;
                        table.map(obj => delete obj.errorsPFR);
                        return table;
                    } else {
                        return [];
                    }
                }),
                map((res: Wniosek[]) => {
                    if (res && res.length > 0) {
                        let wn: Wniosek[] = [];
                        wn = res.sort((a, b) => (a.applicationDateRequested > b.applicationDateRequested ? -1 : 1));
                        wn = wn.filter(item => !item.parentApplicationId);
                        for (const item of wn) {
                            item.odwolania = res.filter(it => it.parentApplicationId === item.applicationId);
                        }
                        return wn;
                    } else {
                        return [];
                    }
                }),
                finalize(() => this.loading.next(false))
            );
    }

    wszystkieWnioski() {
        this.wszystkieWnioskiInternal().pipe(take(1)).subscribe((res: Wniosek[]) => this.wnioski.next(res));
    }

    nowyWniosek(): Observable<any> {
        return this.http.get(this.apiUrl + 'getNewApplicationLink').pipe(catchError(err => of(null)));
    }

    noweOdwolanie(hash: string): Observable<any> {
        return this.http.get(this.apiUrl + 'getNewClaimLink/' + hash);
    }

    odswiezSesje(): Observable<string> {
        return this.http.get(this.apiUrl + 'refreshToken', { responseType: 'text', observe: 'response' }).pipe(
            map(res => {
                if (res.status === 200) {
                    return res.body;
                } else {
                    return null;
                }
            }));
    }

    zaloguj(token: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + 'LoginUser/' + token);
    }

    pobierzDokument(id: string): Observable<string> {
        return this.http.get(this.apiUrl + 'getDocument/' + id, { responseType: 'text', observe: 'response' })
            .pipe(map(res => {
                if (res.status === 200) {
                    sessionStorage.setItem('id_token', res.headers.get('token'));
                    return res.body;
                } else {
                    return null;
                }
            }));
    }

    applicationStatus(appStatus: string) {
        let appStatusPl = '';
        switch (appStatus) {
            case 'NEW': {
                appStatusPl = 'Wprowadzony';
                break;
            }
            case 'SEND': {
                appStatusPl = 'Wysłany';
                break;
            }
            case 'REJECTED_BAD_DATA': {
                appStatusPl = 'Odrzucony';
                break;
            }
            case 'REJECTED_AFTER_SCORING': {
                appStatusPl = 'Odrzucony';
                break;
            }
            case 'GRANTED': {
                appStatusPl = 'Przyznany';
                break;
            }
            case 'GRANTED_CHANGED': {
                appStatusPl = 'Przyznany';
                break;
            }
            case 'INITIATED': {
                appStatusPl = 'Wypłacony';
                break;
            } default: {
                appStatusPl = 'Weryfikacja';
                break;
            }
        }
        return appStatusPl;
    }

    checkAmount(amountReq: number, amountGranded: number) {
        let amountClass = '';
        switch (true) {
            case (amountGranded / amountReq <= 0.25): {
                amountClass = 'orange';
                break;
            }
            case (amountGranded / amountReq > 0.25 && amountGranded / amountReq < 1): {
                amountClass = 'red';
                break;
            }
            case (amountGranded / amountReq === 1): {
                amountClass = 'green';
                break;
            } default: {
                break;
            }
        }
        return amountClass;
    }

    showAmount(amount: number) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł.';
    }

    showData(czas: string) {
        return czas.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2}).*/, '$3-$2-$1');
    }

    showDecision(decisionID: string) {
        let showDecisionButton = false;
        showDecisionButton = !(decisionID) ? false : true;
        return showDecisionButton;
    }

    showDocument(documentID: string) {
        let showDocumentButton = false;
        showDocumentButton = !(documentID) ? false : true;
        return showDocumentButton;
    }

    statusColor(applicationStatus: string) {
        let statusClass = '';
        switch (applicationStatus) {
            case 'Złożony': {
                statusClass = 'green';
                break;
            }
            case 'Wysłany': {
                statusClass = 'green';
                break;
            }
            case 'Przyznany': {
                statusClass = 'green';
                break;
            }
            case 'Odrzucony': {
                statusClass = 'red';
                break;
            } default: {
                break;
            }
        }
        return statusClass;
    }
}
