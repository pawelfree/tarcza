import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit {

  loggedIn$: Observable<User>;
  session$: Observable<number>;

  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
    localStorage.removeItem( 'id_token' )
    this.loggedIn$ = this.auth.loggedIn$;
    this.session$ = this.auth.sessionTimer$;
  }

  logout() {
    this.auth.logout();
  }

}
