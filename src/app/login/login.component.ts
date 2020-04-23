import { Component, OnInit } from '@angular/core';
import { WnioskiService } from '../services/wnioski.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, take, map, catchError } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private wnioski: WnioskiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
      map(param => {
        const token = param['token'];
        if (token) {
          this.wnioski.zaloguj(token).pipe(
            catchError(() => this.router.navigateByUrl('/error'))
          ).subscribe(res => {
            if (res['id'] === token) {
              localStorage.setItem('id_token',token);
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
