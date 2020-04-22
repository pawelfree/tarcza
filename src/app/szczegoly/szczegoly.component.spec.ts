import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzczegolyComponent } from './szczegoly.component';

describe('SzczegolyComponent', () => {
  let component: SzczegolyComponent;
  let fixture: ComponentFixture<SzczegolyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzczegolyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzczegolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
