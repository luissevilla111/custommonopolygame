import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgandwhatComponent } from './msgandwhat.component';

describe('MsgandwhatComponent', () => {
  let component: MsgandwhatComponent;
  let fixture: ComponentFixture<MsgandwhatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgandwhatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgandwhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
