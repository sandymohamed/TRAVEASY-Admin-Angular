import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedHotelsComponent } from './booked-hotels.component';

describe('BookedHotelsComponent', () => {
  let component: BookedHotelsComponent;
  let fixture: ComponentFixture<BookedHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedHotelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
