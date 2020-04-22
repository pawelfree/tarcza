import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WnioskiComponent } from './wnioski.component';

describe('WnioskiComponent', () => {
  let component: WnioskiComponent;
  let fixture: ComponentFixture<WnioskiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WnioskiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WnioskiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
