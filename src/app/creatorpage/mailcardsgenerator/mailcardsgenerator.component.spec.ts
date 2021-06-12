import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailcardsgeneratorComponent } from './mailcardsgenerator.component';

describe('MailcardsgeneratorComponent', () => {
  let component: MailcardsgeneratorComponent;
  let fixture: ComponentFixture<MailcardsgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailcardsgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailcardsgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
