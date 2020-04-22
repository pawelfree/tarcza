import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Wniosek } from '../models/wniosek';
import { WnioskiService } from '../services/wnioski.service';

@Component({
  selector: 'app-wnioski',
  templateUrl: './wnioski.component.html',
  styleUrls: ['./wnioski.component.css']
})
export class WnioskiComponent implements OnInit {

  wnioski$: Observable<Wniosek[]>;

  constructor(private wnioski : WnioskiService) { }

  ngOnInit(): void {
    this.wnioski$ = this.wnioski.wszystkieWnioski();
  }

}
