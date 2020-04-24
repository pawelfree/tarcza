import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Wniosek } from '../models/wniosek';
import { WnioskiService } from '../services/wnioski.service';
import { DOCUMENT } from '@angular/common';
import { take, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WaitComponent } from '../wait/wait.component';

@Component({
  selector: 'app-wnioski',
  templateUrl: './wnioski.component.html',
  styleUrls: ['./wnioski.component.css']
})
export class WnioskiComponent implements OnInit {

  wnioski$: Observable<Wniosek[]>;

  constructor(private wnioski: WnioskiService,
              private router: Router,
              public dialog: MatDialog,
              @Inject(DOCUMENT) private document: Document) { }

  statusColor(applicationStatus: string) {
    var statusClass: string = "";

    switch (applicationStatus) {
      case "Złożony": {
        statusClass = "green";
        break;
      }
      case "Wysłany": {
        statusClass = "green";
        break;
      }
      case "Odrzucony": {
        statusClass = "red";
        break;
      } default: {
        break;
      }
    }
    return statusClass
  }

  showAppeal(applicationStatus: string, amountReq: number, amountGranded: number) {
    var hiddenAppeal = false;
    hiddenAppeal = amountGranded != amountReq ? false : true;
    //TOTO na dzisiaj zawsza nie pokauje
    //return hiddenAppeal;
    return true;
  }

  nowyWniosek() {
    const dialogRef = this.dialog.open(WaitComponent, {disableClose : true});
    this.wnioski.nowyWniosek().pipe(
      take(1),
      catchError(err => {
        dialogRef.close();
        this.router.navigateByUrl('/error')
        return null
      })
    ).subscribe(
      res => {
        dialogRef.close();
        this.document.location.href = res['Link'];        
      }
    )
  }


  ngOnInit(): void {
    this.wnioski$ = this.wnioski.wszystkieWnioski();
  }

}
