import { Component, Input, Inject, ChangeDetectionStrategy } from '@angular/core';
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
  styleUrls: ['./wniosek.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WniosekComponent {

  @Input()
  wniosek: Wniosek;
  @Input()
  even: boolean;
  loadingDocuments = false;
  redirectingToApplication = false;

  constructor(private readonly authService: AuthService,
              private readonly wnioskiService: WnioskiService,
              private readonly dialog: MatDialog,
              private readonly router: Router,
              @Inject(DOCUMENT) private document: Document) {}

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
    this.wnioskiService.wszystkieWnioski();
  }

  noweOdwolanie() {
    const dialogRef = this.dialog.open(WaitComponent, { disableClose: true });

    this.wnioskiService.noweOdwolanie(encodeURIComponent(this.wniosek.isClaimAllowed))
      .pipe(take(1)).subscribe(res => {
        dialogRef.close();
        this.redirectingToApplication = true;
        this.document.location.href = res.url;
      }, err => {
        if (err.status === 403) {
          dialogRef.close();
          this.showErrorDialog(err.error.innerStatusCode);
        } else {
          dialogRef.close();
          this.router.navigateByUrl('/error');
        }
      });
  }

  showErrorDialog(kodBledu: string) {
    const errorRef = this.dialog.open(ErrorComponent, {
      disableClose: true,
      data: { message: kodBledu }
    });
    errorRef.afterClosed().pipe(take(1)).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.wnioskiService.wszystkieWnioski();
      }
    });
  }
}
