import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wniosek } from '../models/wniosek';
import { WnioskiService } from '../services/wnioski.service';
import { DOCUMENT } from '@angular/common';
import { take, catchError, finalize, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WaitComponent } from '../wait/wait.component';

@Component({
  selector: 'app-wnioski',
  templateUrl: './wnioski.component.html',
  styleUrls: ['./wnioski.component.css']
})
export class WnioskiComponent implements OnInit {

  private wnioski = new BehaviorSubject<Array<Wniosek>>(null);
  wnioski$ = this.wnioski.asObservable();
  public zablokowanyPrzyciskNowyWniosek = false;
  loading = false;
  redirectingToApplication = false;
  loadingDocuments = false;

  constructor(private wnioskiService: WnioskiService, private router: Router, public dialog: MatDialog,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.loading = true;
    this.wnioskiService.wszystkieWnioski().pipe(
      map((res: Wniosek[]) => {
        if (res && res.length > 0) {
          let wn: Wniosek[] = [];
          wn = res.sort((a, b) => (a.applicationDateRequested > b.applicationDateRequested ? -1 : 1));
          wn = wn.filter(item => !item.parentApplicationId);
          for (const item of wn) {
            item.odwolania = res.filter(it => it.parentApplicationId === item.applicationId);
          }
          return wn;
        } else {
          return null;
        }
      }),
      finalize(() => this.loading = false))
      .subscribe((res: Wniosek[]) => this.wnioski.next(res) );
    this.zablokowanyPrzyciskNowyWniosek = false;
    this.redirectingToApplication = false;
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
        console.log('res',res);
        dialogRef.close();
        if (res) {
          this.redirectingToApplication = true;
          this.document.location.href = res.url;
        }
      }
    );
  }

}
