import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerForm } from './prayer-form';

describe('PrayerForm', () => {
  let component: PrayerForm;
  let fixture: ComponentFixture<PrayerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
