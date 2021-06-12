import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorofcardsComponent } from './paginadorofcards.component';

describe('PaginadorofcardsComponent', () => {
  let component: PaginadorofcardsComponent;
  let fixture: ComponentFixture<PaginadorofcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginadorofcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorofcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
