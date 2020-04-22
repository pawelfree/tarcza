import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, catchError, map, tap } from 'rxjs/operators'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-szczegoly',
  templateUrl: './szczegoly.component.html',
  styleUrls: ['./szczegoly.component.css']
})
export class SzczegolyComponent implements OnInit {

  szczegoly$: Observable<[{nazwa:string, link: string}]>
  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.szczegoly$ = this.route.snapshot.data.szczegoly;

  }

}
