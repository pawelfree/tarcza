import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { LoginResult } from '../../models/login.constants';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
} )
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      take( 1 ),
      switchMap( param => this.auth.login( param.UfChecksum ) )
    ).subscribe( result => {
      switch ( result ) {
        case LoginResult.TRUE:
          this.router.navigateByUrl( '/wnioski' );
          break;
        case LoginResult.PERSON:
          this.router.navigateByUrl( '/person' );
          break;
        default:
          this.router.navigateByUrl( '/error' );
      }
    } );
  }
}
