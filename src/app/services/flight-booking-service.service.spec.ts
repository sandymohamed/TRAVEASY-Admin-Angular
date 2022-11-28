import { TestBed } from '@angular/core/testing';

import { FlightBookingServiceService } from './flight-booking-service.service';

describe('FlightBookingServiceService', () => {
  let service: FlightBookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightBookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
