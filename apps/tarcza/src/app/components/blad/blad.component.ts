import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blad',
  templateUrl: './blad.component.html',
  styleUrls: ['./blad.component.css']
})
export class BladComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.logout(false);
  }

}
