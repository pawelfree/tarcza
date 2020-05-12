import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Wniosek } from '../../models/wniosek';
import { WnioskiService } from '../../services/wnioski.service';
import { DOCUMENT } from '@angular/common';
import { take, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WaitComponent } from '../wait/wait.component';

@Component({
  selector: 'app-wnioski',
  templateUrl: './wnioski.component.html',
  styleUrls: ['./wnioski.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WnioskiComponent implements OnInit {

  public zablokowanyPrzyciskNowyWniosek = false;
  redirectingToApplication = false;
  loadingDocuments = false;
  wnioski$: Observable<Wniosek[]>;
  loading$: Observable<boolean>;

  constructor(private wnioskiService: WnioskiService, private router: Router, public dialog: MatDialog,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.loading$ = this.wnioskiService.loading$;
    this.wnioski$ = this.wnioskiService.wnioski$;
    this.zablokowanyPrzyciskNowyWniosek = false;
    this.redirectingToApplication = false;
    this.wnioskiService.wszystkieWnioski();
  }

  nowyWniosek() {
    this.zablokowanyPrzyciskNowyWniosek = true;
    const dialogRef = this.dialog.open(WaitComponent, { disableClose: true });
    this.wnioskiService.nowyWniosek().pipe(
      take(1),
      catchError(err => {
        dialogRef.close();
        this.router.navigateByUrl('/error');
        return null;
      })
    ).subscribe(
      res => {
        dialogRef.close();
        if (res) {
          this.redirectingToApplication = true;
          this.document.location.href = res.url;
        }
      }
    );
  }

}
