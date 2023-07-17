import { TestScheduler } from 'rxjs/testing';
import { BookingProgressService } from './booking-progress.service';

describe('BookingProgressService', () => {
  let service: BookingProgressService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    service = new BookingProgressService();
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger cancelBookingProgress$', (done) => {
    service.onCancelBookingProgress$.subscribe(() => {
      done();
    });

    service.cancelBookingProgress();
  });
});
