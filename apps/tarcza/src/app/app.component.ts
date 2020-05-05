import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, fromEvent, Subscription, Subject } from 'rxjs';
import { User } from './models/user';
import { tap, filter, distinctUntilChanged, take, switchMapTo, delay, takeUntil } from 'rxjs/operators';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit, OnDestroy {

  loggedIn$: Observable<User>;
  session$: Observable<number>;
  private subs: Subscription = null;
  private unsubscribe$ = new Subject<void>();
  private timerWarn: number = 90;

  constructor( private auth: AuthService ) { }


  ngOnInit(): void {
    localStorage.removeItem( 'id_token' )
    this.loggedIn$ = this.auth.loggedIn$;
    this.session$ = this.auth.sessionTimer$;

    this.subs = this.session$.pipe(
      distinctUntilChanged(),
      filter(timer => timer > 0 && timer < this.timerWarn),
      switchMapTo(fromEvent<any>(document,'click').pipe(takeUntil(this.unsubscribe$), take(1))),
      tap(_ => {
        this.odswiezSesje();
      }),
      delay(3000)
    ).subscribe();

  }

  timerWaring(sec: number) {
    return sec > this.timerWarn ? true : false;
  }

  logout() {
    this.auth.logout();
  }

  odswiezSesje() {
    this.auth.odswiezSesje();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
