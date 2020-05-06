import { Component, OnInit, Input } from '@angular/core';
import { Wniosek } from '../../models/wniosek';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { WnioskiService } from '../../services/wnioski.service';
import { finalize } from 'rxjs/operators';
import { objectID } from '../../services/objectid';


@Component({
  selector: 'app-wniosek',
  templateUrl: './wniosek.component.html',
  styleUrls: ['./wniosek.component.css']
})
export class WniosekComponent implements OnInit {

  @Input()
  wniosek: Wniosek;
  @Input()
  even: boolean;
  loadingDocuments = false;

  constructor(private readonly authService: AuthService, private readonly wnioskiService: WnioskiService) { }

  ngOnInit(): void {
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
      const options = '?documentId=' + encodeURIComponent(id) +
        '&requestId=' + encodeURIComponent(objectID()) +
        '&authorization=' + encodeURIComponent(sessionStorage.getItem('id_token'));
      const server = environment.apiUrl + 'getDocument';
      const link = server + options;
      window.open(link, '_blank');
    }
  }
  applicationStatus(appStatus: string) {
    return this.wnioskiService.applicationStatus(appStatus);
  }
  checkAmount(amountReq: number, amountGranded: number) {
    return this.wnioskiService.checkAmount(amountReq, amountGranded);
  }

  showAmount(amount: number) {
    return this.wnioskiService.showAmount(amount);
  }
  showData(czas: string) {
    return this.wnioskiService.showData(czas);
  }

  showDecision(decisionID: string) {
    return this.wnioskiService.showDecision(decisionID);
  }

  showDocument(documentID: string) {
    return this.wnioskiService.showDocument(documentID);
  }

  statusColor(applicationStatus: string) {
    return this.wnioskiService.statusColor(applicationStatus);
  }

}
