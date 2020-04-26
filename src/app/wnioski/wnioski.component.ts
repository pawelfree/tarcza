import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wniosek } from '../models/wniosek';
import { WnioskiService } from '../services/wnioski.service';
import { DOCUMENT } from '@angular/common';
import { take, catchError, finalize } from 'rxjs/operators';
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
  loadingDocuments = false;
  redirectingToApplication = false;

  constructor( private wnioskiService: WnioskiService, private router: Router, public dialog: MatDialog,
    @Inject( DOCUMENT ) private document: Document ) { }

  ngOnInit(): void {
    this.loading = true;
    this.wnioskiService.wszystkieWnioski().pipe( finalize( () => this.loading = false ) )
      .subscribe( ( res: Wniosek[] ) => res ? ( res.length > 0 ? this.wnioski.next( res ) : this.wnioski.next( null ) ) : this.wnioski.next( null ) );
    this.zablokowanyPrzyciskNowyWniosek = false;
    this.redirectingToApplication = false;
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
      case "Przyznany": {
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

  private objectID(): string {
    const timestamp = ( new Date().getTime() / 1000 | 0 ).toString( 16 );
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace( /[x]/g, function () {
      return ( Math.random() * 16 | 0 ).toString( 16 );
    } ).toLowerCase();
  };

  loadPdf( id: string ) {
    if ( environment.getDocumentMethod === 'PARAM' ) {
      this.loadingDocuments = true;
      this.wnioskiService.pobierzDokument( encodeURIComponent( id ) ).pipe( finalize( () => this.loadingDocuments = false ) ).subscribe( res => {
        if ( res ) {
          window.open( "data:applicatio/pdf;base64," + res, "_blank" );
        }
      },
        err => {
          console.log( "1002", err )
        } );
    } else {
      const options = "?documentId=" + encodeURIComponent( id ) + "&requestId=" + encodeURIComponent( this.objectID() ) + "&authorization=" + encodeURIComponent( localStorage.getItem( 'id_token' ) );
      const server = environment.apiUrl + 'getDocument';
      const link = server + options;
      window.open( link, "_blank" );
    }
  }

  showAmount( amount: number ) {
    return amount.toString().replace( /\B(?=(\d{3})+(?!\d))/g, " " ) + " zł.";
  }

  showAppeal( applicationStatus: string ) {
    var hiddenAppeal = true;
    hiddenAppeal = applicationStatus != "Odrzucony" ? false : true;
    return hiddenAppeal;
  }

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
        this.redirectingToApplication = true;
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
  applicationStatus( appStatus: string ) {
    var appStatusPl: string = "";
    switch ( appStatus ) {
      case "NEW": {
        appStatusPl = "Wprowadzony";
        break;
      }
      case "SEND": {
        appStatusPl = "Wysłany";
        break;
      }
      case "REJECTED-BAD-DATA": {
        appStatusPl = "Odrzucony";
        break;
      }
      case "REJECTED-AFTER-SCORING": {
        appStatusPl = "Odrzucony";
        break;
      }
      case "GRANTED": {
        appStatusPl = "Przyznany";
        break;
      }
      case "GRANTED-CHANGED": {
        appStatusPl = "Przyznany";
        break;
      }
      case "INITIATED": {
        appStatusPl = "Wypłacony";
        break;
      } default: {
        appStatusPl = "Weryfikacja";
        break;
      }
    }
    return appStatusPl;
  }
}
