import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcardsComponent } from './gcards.component';

describe('GcardsComponent', () => {
  let component: GcardsComponent;
  let fixture: ComponentFixture<GcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
