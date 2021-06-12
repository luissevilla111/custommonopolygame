import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMonGameComponent } from './menu-mon-game.component';

describe('MenuMonGameComponent', () => {
  let component: MenuMonGameComponent;
  let fixture: ComponentFixture<MenuMonGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMonGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
