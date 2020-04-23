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

  statusColor(applicationStatus:string) {
    var statusClass:string="";

    switch(applicationStatus) {
      case "Złożony" : { 
        statusClass="green";
        break;
      }
      case "Wysłany" : { 
          statusClass="green";
          break;
      }
      case "Odrzucony" : { 
          statusClass="red";
        break;
      } default : {
        break;
      }
    }
    return statusClass
  }

  showAppeal(applicationStatus:string, amountReq:number, amountGranded:number) {
      var hiddenAppeal = false;
      hiddenAppeal = amountGranded != amountReq ? false : true; 

      return hiddenAppeal
  
  
  }

  
    
  ngOnInit(): void {
    this.wnioski$ = this.wnioski.wszystkieWnioski();
  }

}
