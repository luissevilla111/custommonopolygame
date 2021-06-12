import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaNavComponent } from './social-media-nav.component';

describe('SocialMediaNavComponent', () => {
  let component: SocialMediaNavComponent;
  let fixture: ComponentFixture<SocialMediaNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
