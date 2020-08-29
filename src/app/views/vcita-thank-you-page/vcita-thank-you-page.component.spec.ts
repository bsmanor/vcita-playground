import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcitaThankYouPageComponent } from './vcita-thank-you-page.component';

describe('VcitaThankYouPageComponent', () => {
  let component: VcitaThankYouPageComponent;
  let fixture: ComponentFixture<VcitaThankYouPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcitaThankYouPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcitaThankYouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
