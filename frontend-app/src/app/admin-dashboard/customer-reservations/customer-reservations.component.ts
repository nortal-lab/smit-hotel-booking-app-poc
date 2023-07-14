import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Booking } from '../../models/booking.interface';
import { EmployeeFacade } from '../../facades/employee.facade';

@Component({
  selector: 'app-customer-reservations',
  templateUrl: './customer-reservations.component.html',
  styleUrls: ['./customer-reservations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerReservationsComponent {
  @Input() bookings?: Booking[] | null;

  dateFormatString = 'dd.MM.yyyy';
  reservationsTableHeaderLabels = ['Booking No.', 'Room', 'Guest', 'Dates'];

  constructor(private readonly employeeFacade: EmployeeFacade) {}

  cancelBooking(bookingId: string, closeModal: () => void) {
    this.employeeFacade.cancelBooking(bookingId);
    closeModal;
  }
}
