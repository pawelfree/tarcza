import { Component, OnInit, Input, Inject } from '@angular/core';
import { Wniosek } from '../../../models/wniosek';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { WnioskiService } from '../../../services/wnioski.service';
import { finalize, take } from 'rxjs/operators';
import { objectID } from '../../../services/objectid';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../../error/error.component';
import { WaitComponent } from '../../wait/wait.component';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';




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

  redirectingToApplication = false;

  constructor(private readonly authService: AuthService, private readonly wnioskiService: WnioskiService, private readonly dialog: MatDialog,
    private router: Router, @Inject(DOCUMENT) private document: Document) { }
  

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

  noweOdwolanie() {
    const dialogRef = this.dialog.open(WaitComponent, { disableClose: true });
   
    this.wnioskiService.noweOdwolanie(encodeURIComponent(this.wniosek.isClaimAllowed))
      .pipe(take(1)).subscribe(res => {
        dialogRef.close()
        this.redirectingToApplication = true;
        this.document.location.href = res.url;
      }, err => {
        if (err.status === 403) {
            dialogRef.close();
            this.showErrorDialog(err.error.InternalStatusCode);
        } else {
          dialogRef.close();
          this.router.navigateByUrl('/error');
          return null;
        }
      });
  }

  showErrorDialog(kodBledu: string) {
    const errorRef = this.dialog.open(ErrorComponent,{disableClose: true,
      data:{
        message: kodBledu + ' Alicja w krainie czarów'
      }
    });
    errorRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('Ala ma kota, okno zamknięte');
        this.router.navigateByUrl('/wnioski');
      }
    });
    
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
