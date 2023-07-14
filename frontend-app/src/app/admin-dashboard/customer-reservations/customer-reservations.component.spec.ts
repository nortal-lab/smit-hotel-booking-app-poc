import { CustomerReservationsComponent } from './customer-reservations.component';
import { EmployeeFacade } from '../../facades/employee.facade';
import { MockService } from 'ng-mocks';
import { ToastService } from '@egov/cvi-ng';
import { of } from 'rxjs';

jest.mock('@egov/cvi-ng', () => {
  return {
    ToastService: jest.fn().mockImplementation(() => {
      return {
        // mock methods if needed
      };
    }),
  };
});

describe('CustomerReservationsComponent', () => {
  let component: CustomerReservationsComponent;
  const mockEmployeeFacade = MockService(EmployeeFacade, {
    cancelBooking: () => of(),
  });

  beforeEach(async () => {
    component = new CustomerReservationsComponent(mockEmployeeFacade, MockService(ToastService));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cancelBooking on EmployeeFacade when cancelBooking is called', (done) => {
    const spyCancellation = jest.spyOn(mockEmployeeFacade, 'cancelBooking');

    const bookingId = '1234';
    const closeModal = jest.fn();
    component.cancelBooking(bookingId, closeModal);
    expect(spyCancellation).toHaveBeenCalledWith(bookingId);
    done();
  });
});
