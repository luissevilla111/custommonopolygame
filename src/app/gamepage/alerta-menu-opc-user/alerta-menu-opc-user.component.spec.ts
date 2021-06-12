import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaMenuOpcUserComponent } from './alerta-menu-opc-user.component';

describe('AlertaMenuOpcUserComponent', () => {
  let component: AlertaMenuOpcUserComponent;
  let fixture: ComponentFixture<AlertaMenuOpcUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaMenuOpcUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaMenuOpcUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
