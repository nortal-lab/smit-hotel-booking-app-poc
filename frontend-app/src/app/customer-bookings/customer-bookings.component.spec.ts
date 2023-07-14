import { CustomerBookingsComponent } from './customer-bookings.component';
import { MockService } from 'ng-mocks';
import { CustomerFacade } from '../facades/customer.facade';
import { Router } from '@angular/router';
import { ToastService } from '@egov/cvi-ng';
import { ChangeDetectorRef } from '@angular/core';
import { TimeService } from '../services/time.service';
import { format } from 'date-fns';
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
  const routerMock = MockService(Router);

  beforeEach(() => {
    component = new CustomerBookingsComponent(
      customerFacadeMock,
      routerMock,
      MockService(ToastService),
      MockService(ChangeDetectorRef),
      MockService(TimeService)
    );
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
});
