import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from './models/user';
import { Router, NavigationStart } from '@angular/router';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit, OnDestroy {

  loggedIn$: Observable<User>;
  subs: Subscription;

  constructor( private auth: AuthService,
    private router: Router ) { }

  ngOnInit(): void {
    localStorage.removeItem( 'id_token' )
    this.loggedIn$ = this.auth.loggedIn$;
    this.subs = this.router.events.subscribe( event => {
      if ( event instanceof NavigationStart ) {
        console.log( 'navigation', event.navigationTrigger )
      }
    } )
  }

  ngOnDestroy(): void {
    if ( this.subs ) {
      this.subs.unsubscribe();
    }
  }

  logout() {
    this.auth.logout();
  }

}
