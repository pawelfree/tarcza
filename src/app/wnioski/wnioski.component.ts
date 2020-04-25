import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Wniosek } from '../models/wniosek';
import { WnioskiService } from '../services/wnioski.service';
import { DOCUMENT } from '@angular/common';
import { take, catchError, tap, map, finalize } from 'rxjs/operators';
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

  private wnioski = new BehaviorSubject<Array<Wniosek>>( null );
  wnioski$ = this.wnioski.asObservable();
  public zablokowanyPrzyciskNowyWniosek = false
  loading = false;

  constructor( private wnioskiService: WnioskiService,
    private router: Router,
    public dialog: MatDialog,
    @Inject( DOCUMENT ) private document: Document ) { }

  ngOnInit(): void {
    this.loading = true;
    this.wnioskiService.wszystkieWnioski().pipe(
      map( res => Array.from( res['applications'] ) ),
      finalize( () => this.loading = false ) )
      .subscribe(
        ( res: Wniosek[] ) => this.wnioski.next( res ) );
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
    const link = environment.apiUrl + 'getDocument/' + id;
    // const link = environment.apiUrl + 'getDocumentMock';
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
    this.wnioskiService.nowyWniosek().pipe(
      take( 1 ),
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
