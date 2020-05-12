import { Component, Input } from '@angular/core';
import { Wniosek } from '../../../models/wniosek';
import { environment } from '../../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { WnioskiService } from '../../../services/wnioski.service';
import { AuthService } from '../../../services/auth.service';
import { objectID } from '../../../services/objectid';

@Component({
  selector: 'app-odwolanie',
  templateUrl: 'odwolanie.component.html',
  styleUrls: ['odwolanie.component.css']
})
export class OdwolanieComponent {

  @Input()
  odwolanie: Wniosek;
  loadingDocuments = false;

  constructor(private readonly wnioskiService: WnioskiService,
              private readonly authService: AuthService) { }

  loadPdf(id: string) {
    if (environment.getDocumentMethod === 'PARAM') {
      this.loadingDocuments = true;
      this.wnioskiService.pobierzDokument(encodeURIComponent(id)).pipe(finalize(() => this.loadingDocuments = false)).subscribe(res => {
        if (res) {
          window.open('data:applicatio/pdf;base64,' + res, '_blank');
        }
      },
        err => {
          console.log('1003');
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
