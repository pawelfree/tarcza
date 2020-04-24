import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      take(1),
      switchMap(param => this.auth.login(param['UfChecksum']))
    ).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/wnioski');
      } else {
        this.router.navigateByUrl('/error')
      }
    });
  }
}
