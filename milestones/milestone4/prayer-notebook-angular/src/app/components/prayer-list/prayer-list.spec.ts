import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerList } from './prayer-list';

describe('PrayerList', () => {
  let component: PrayerList;
  let fixture: ComponentFixture<PrayerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
