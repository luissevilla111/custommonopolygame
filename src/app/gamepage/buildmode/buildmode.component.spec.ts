import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildmodeComponent } from './buildmode.component';

describe('BuildmodeComponent', () => {
  let component: BuildmodeComponent;
  let fixture: ComponentFixture<BuildmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
