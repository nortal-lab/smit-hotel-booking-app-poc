import { BookingProgressService } from './booking-progress.service';

describe('BookingProgressService', () => {
  let service: BookingProgressService;

  beforeEach(() => {
    service = new BookingProgressService();
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
