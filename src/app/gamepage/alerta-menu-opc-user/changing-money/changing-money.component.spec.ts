import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangingMoneyComponent } from './changing-money.component';

describe('ChangingMoneyComponent', () => {
  let component: ChangingMoneyComponent;
  let fixture: ComponentFixture<ChangingMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangingMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangingMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
