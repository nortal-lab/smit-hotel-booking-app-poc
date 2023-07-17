import { CustomerBookingsComponent } from './customer-bookings.component';
import { MockService } from 'ng-mocks';
import { CustomerFacade } from '../facades/customer.facade';
import { Router } from '@angular/router';
import { ToastService } from '@egov/cvi-ng';
import { ChangeDetectorRef } from '@angular/core';
import { TimeService } from '../services/time.service';
import { Observable, of } from 'rxjs';

jest.mock('@egov/cvi-ng', () => {
  return {
    ToastService: jest.fn().mockImplementation(() => {
      return {
        // mock methods if needed
      };
    }),
  };
});

describe('CustomerBookingsComponent', () => {
  let component: CustomerBookingsComponent;
  const customerFacadeMock = MockService(CustomerFacade, {
    cancelBooking(bookingId: string): Observable<Object> {
      return of();
    },
  });
  let timeService: TimeService;
  const routerMock = MockService(Router);

  beforeEach(() => {
    timeService = new TimeService();
    component = new CustomerBookingsComponent(customerFacadeMock, routerMock, MockService(ToastService), MockService(ChangeDetectorRef), timeService);
  });

  describe('changeBreadcrumb', () => {
    it('should navigate to homepage', () => {
      const routerSpy = jest.spyOn(routerMock, 'navigate');

      component.changeBreadcrumb(0);
      expect(routerSpy).toHaveBeenCalledWith(['/']);
      jest.clearAllMocks();
    });

    it('should not navigate to homepage', () => {
      const routerSpy = jest.spyOn(routerMock, 'navigate');

      component.changeBreadcrumb(1);
      expect(routerSpy).not.toHaveBeenCalled();
    });
  });

  describe('cancelBooking', () => {
    it('should trigger booking cancellation', (done) => {
      const cancellationSpy = jest.spyOn(customerFacadeMock, 'cancelBooking');

      const closeModal = jest.fn();

      component.cancelBooking('bookingId', closeModal);

      expect(cancellationSpy).toHaveBeenCalledWith('bookingId');
      done();
    });
  });

  describe('getBadgeLabel', () => {
    it('should return "Today" if the date is the same day', () => {
      jest.spyOn(timeService, 'isTheSameDay').mockReturnValue(true);
      const badgeLabel = component.getBadgeLabel(new Date().toISOString());
      expect(badgeLabel).toEqual('Today');
    });

    it('should return the number of days until date if the date is in the future', () => {
      jest.spyOn(timeService, 'isTheSameDay').mockReturnValue(false);
      jest.spyOn(timeService, 'isFutureDate').mockReturnValue(true);
      jest.spyOn(timeService, 'daysUntilDate').mockReturnValue('5 days');

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);

      const badgeLabel = component.getBadgeLabel(futureDate.toISOString());
      expect(badgeLabel).toEqual('5 days');
    });

    it('should return an empty string if the date is not the same day and is not in the future', () => {
      jest.spyOn(timeService, 'isTheSameDay').mockReturnValue(false);
      jest.spyOn(timeService, 'isFutureDate').mockReturnValue(false);
      const badgeLabel = component.getBadgeLabel(new Date().toISOString());
      expect(badgeLabel).toEqual('');
    });
  });
});
