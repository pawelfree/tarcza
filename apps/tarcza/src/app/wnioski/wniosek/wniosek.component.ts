import { Component, OnInit, Input } from '@angular/core';
import { Wniosek } from '../../models/wniosek';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { WnioskiService } from '../../services/wnioski.service';
import { finalize } from 'rxjs/operators';
import { objectID } from '../../services/objectid.service';


@Component({
  selector: 'app-wniosek',
  templateUrl: './wniosek.component.html',
  styleUrls: ['./wniosek.component.css']
})
export class WniosekComponent implements OnInit {

  @Input()
  wniosek: Wniosek;
  loadingDocuments = false;

  constructor(private readonly authService: AuthService, private readonly wnioskiService: WnioskiService) { }

  ngOnInit(): void {
  }

  checkAmount(amountReq: number, amountGranded: number) {
    let amountClass = '';
    switch (true) {
      case (amountGranded / amountReq <= 0.25): {
        amountClass = 'orange';
        break;
      }
      case (amountGranded / amountReq > 0.25 && amountGranded / amountReq < 1): {
        amountClass = 'red';
        break;
      }
      case (amountGranded / amountReq === 1): {
        amountClass = 'green';
        break;
      } default: {
        break;
      }
    }
    return amountClass;

  }

  loadPdf(id: string) {
    if (environment.getDocumentMethod === 'PARAM') {
      this.loadingDocuments = true;
      this.wnioskiService.pobierzDokument(encodeURIComponent(id)).pipe(finalize(() => this.loadingDocuments = false)).subscribe(res => {
        if (res) {
          window.open('data:applicatio/pdf;base64,' + res, '_blank');
        }
      },
        err => {
          console.log('1002');
        });
    } else {
      this.authService.odswiezSesje();
      const options = '?documentId=' + encodeURIComponent(id) + '&requestId=' + encodeURIComponent(objectID()) + '&authorization=' + encodeURIComponent(localStorage.getItem('id_token'));
      const server = environment.apiUrl + 'getDocument';
      const link = server + options;
      window.open(link, '_blank');
    }
  }

  showAmount(amount: number) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł.';
  }

  showData(czas: string) {
    return czas.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2}).*/, '$3-$2-$1');
  }

  applicationStatus(appStatus: string) {
    let appStatusPl = '';
    switch (appStatus) {
      case 'NEW': {
        appStatusPl = 'Wprowadzony';
        break;
      }
      case 'SEND': {
        appStatusPl = 'Wysłany';
        break;
      }
      case 'REJECTED_BAD_DATA': {
        appStatusPl = 'Odrzucony';
        break;
      }
      case 'REJECTED_AFTER_SCORING': {
        appStatusPl = 'Odrzucony';
        break;
      }
      case 'GRANTED': {
        appStatusPl = 'Przyznany';
        break;
      }
      case 'GRANTED_CHANGED': {
        appStatusPl = 'Przyznany';
        break;
      }
      case 'INITIATED': {
        appStatusPl = 'Wypłacony';
        break;
      } default: {
        appStatusPl = 'Weryfikacja';
        break;
      }
    }
    return appStatusPl;
  }

  showDecision(decisionID: string) {
    let showDecisionButton = false;
    showDecisionButton = !(decisionID) ? false : true;
    return showDecisionButton;
  }

  showDocument(documentID: string) {
    let showDocumentButton = false;
    showDocumentButton = !(documentID) ? false : true;
    return showDocumentButton;
  }

  statusColor(applicationStatus: string) {
    let statusClass = '';

    switch (applicationStatus) {
      case 'Złożony': {
        statusClass = 'green';
        break;
      }
      case 'Wysłany': {
        statusClass = 'green';
        break;
      }
      case 'Przyznany': {
        statusClass = 'green';
        break;
      }
      case 'Odrzucony': {
        statusClass = 'red';
        break;
      } default: {
        break;
      }
    }
    return statusClass;
  }
}
