import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorpageComponent } from './creatorpage.component';

describe('CreatorpageComponent', () => {
  let component: CreatorpageComponent;
  let fixture: ComponentFixture<CreatorpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
