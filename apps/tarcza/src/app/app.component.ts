import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { User } from './models/user';
import { tap, filter, distinctUntilChanged, take, switchMapTo, delay } from 'rxjs/operators';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit, OnDestroy {

  loggedIn$: Observable<User>;
  session$: Observable<number>;
  private subs: Subscription = null;

  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
    localStorage.removeItem( 'id_token' )
    this.loggedIn$ = this.auth.loggedIn$;
    this.session$ = this.auth.sessionTimer$;

    this.subs = this.session$.pipe(
      distinctUntilChanged(),
      filter(timer => timer > 0 && timer < 90),
      switchMapTo(fromEvent<any>(document,'mousemove').pipe(take(1))),
      tap(_ => {
        this.odswiezSesje();
      }),
      delay(3000)
    ).subscribe();

  }

  logout() {
    this.auth.logout();
  }

  odswiezSesje() {
    this.auth.odswiezSesje();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
