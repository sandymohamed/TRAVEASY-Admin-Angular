import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedHolidaysComponent } from './booked-holidays.component';

describe('BookedHolidaysComponent', () => {
  let component: BookedHolidaysComponent;
  let fixture: ComponentFixture<BookedHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedHolidaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
