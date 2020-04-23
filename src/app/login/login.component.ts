import { Component, OnInit } from '@angular/core';
import { WnioskiService } from '../services/wnioski.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, take, map, catchError } from 'rxjs/operators';
import { noop } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private wnioski: WnioskiService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(
      take(1),
      tap(console.log),
      map(param => {
        const token = param['UfChecksum'];
        if (token) {
          this.wnioski.zaloguj(token).pipe(
            take(1),
            catchError(() => this.router.navigateByUrl('/error'))
          ).subscribe(res => {
            if (res['id'] === token) {
              localStorage.setItem('id_token',token);
              //TODO policzyc milisekundy do wylogowania
              const expirationTimer = 30 * 1000;
              this.auth.setLogoutTimer(expirationTimer);
              this.router.navigateByUrl('/wnioski');
            } else {
              this.router.navigateByUrl('/error')
            }
          })
          
        } else {
          this.router.navigateByUrl('/error')
        }
      })
    ).subscribe( () => noop);
  }
}
