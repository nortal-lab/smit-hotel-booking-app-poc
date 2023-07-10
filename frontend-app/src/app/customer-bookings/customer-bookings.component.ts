import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerFacade } from '../facades/customer.facade';
import { Booking } from '../models/booking.interface';
import { NotificationSeverity } from '@egov/cvi-ng/lib/notification/notification';
import { NotificationSize } from '@egov/cvi-ng';

@Component({
  selector: 'app-customer-bookings',
  templateUrl: './customer-bookings.component.html',
  styleUrls: ['./customer-bookings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBookingsComponent implements OnInit {
  customerBookings$?: Observable<Booking[]>;
  noResultsNotificationSeverity: NotificationSeverity = 'warning';
  noResultsNotificationSize: NotificationSize = 'regular';

  constructor(private readonly customerFacade: CustomerFacade) {}

  ngOnInit() {
    this.customerBookings$ = this.customerFacade.getBookings();
  }

  cancelBooking(bookingId: string, closeModal: () => void) {
    closeModal();
  }
}
