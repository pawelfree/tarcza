import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Wniosek } from '../models/wniosek';
import { WnioskiService } from '../services/wnioski.service';
import { DOCUMENT } from '@angular/common';
import { take, catchError, tap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WaitComponent } from '../wait/wait.component';
import { environment } from 'src/environments/environment';

@Component( {
  selector: 'app-wnioski',
  templateUrl: './wnioski.component.html',
  styleUrls: ['./wnioski.component.css']
} )
export class WnioskiComponent implements OnInit {

  wnioski$: Observable<Wniosek[]>;
  public zablokowanyPrzyciskNowyWniosek = false

  constructor( private wnioski: WnioskiService,
    private router: Router,
    public dialog: MatDialog,
    @Inject( DOCUMENT ) private document: Document ) { }

  ngOnInit(): void {
    this.wnioski$ = this.wnioski.wszystkieWnioski().pipe( map( res => Array.from( res['applictions'] ) ) );
    this.zablokowanyPrzyciskNowyWniosek = false;
  }

  statusColor( applicationStatus: string ) {
    var statusClass: string = "";

    switch ( applicationStatus ) {
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

  loadPdf( id: string ) {
    const _id = id ? id : "getDocumentMock";
    const link = environment.apiUrl + _id;
    window.open( link, "_blank" );
  }
  // showAppeal( applicationStatus: string, amountReq: number, amountGranded: number ) {
  //   var hiddenAppeal = true;
  //   hiddenAppeal = amountGranded != amountReq ? false : true;
  //   //TOTO na dzisiaj zawsza nie pokauje
  //   //return hiddenAppeal;
  //   return false;
  // }

  showAmount( amount: number ) {
    return amount.toString().replace( /\B(?=(\d{3})+(?!\d))/g, " " ) + " zł.";
  }

  showAppeal( applicationStatus: string ) {
    var hiddenAppeal = true;
    hiddenAppeal = applicationStatus != "Odrzucony" ? false : true;
    //TOTO pokazuje na podstawie statusu
    return hiddenAppeal;
    //return false;
  }

  // showAppeal( applicationStatus: string ) {
  //   var hiddenAppeal = true;
  //   hiddenAppeal = applicationStatus != "Odrzucony" ? false : true;
  //   //TOTO pokazuje na podstawie statusu
  //   return hiddenAppeal;
  //   //return false;
  // }

  showDecision( decisionID: string ) {
    var showDecisionButton = false;
    showDecisionButton = !( decisionID ) ? false : true;
    return showDecisionButton;


  }

  showDocument( documentID: string ) {
    var showDocumentButton = false;
    showDocumentButton = !( documentID ) ? false : true;
    return showDocumentButton;
  }

  nowyWniosek() {
    this.zablokowanyPrzyciskNowyWniosek = true;
    const dialogRef = this.dialog.open( WaitComponent, { disableClose: true } );
    this.wnioski.nowyWniosek().pipe(
      take( 1 ),
      tap( console.log ),
      catchError( err => {
        dialogRef.close();
        this.router.navigateByUrl( '/error' )
        return null
      } )
    ).subscribe(
      res => {
        dialogRef.close();
        this.document.location.href = res['url'];
      }
    )
  }

  checkAmount( amountReq: number, amountGranded: number ) {
    var amountClass: string = "";
    switch ( true ) {
      case ( amountGranded / amountReq <= 0.25 ): {
        amountClass = "orange";
        break;
      }
      case ( amountGranded / amountReq > 0.25 && amountGranded / amountReq < 1 ): {
        amountClass = "red";
        break;
      }
      case ( amountGranded / amountReq == 1 ): {
        amountClass = "green";
        break;
      } default: {
        break;
      }
    }
    return amountClass;

  }

}
