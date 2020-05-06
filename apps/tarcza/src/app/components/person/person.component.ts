import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component( {
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
} )
export class PersonComponent implements OnInit {

  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
    this.auth.logout( false );
  }

}
