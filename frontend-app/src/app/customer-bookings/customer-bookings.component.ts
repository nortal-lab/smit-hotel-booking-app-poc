import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { CustomerFacade } from '../facades/customer.facade';
import { Booking } from '../models/booking.interface';
import { NotificationSeverity } from '@egov/cvi-ng/lib/notification/notification';
import { NotificationSize } from '@egov/cvi-ng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-bookings',
  templateUrl: './customer-bookings.component.html',
  styleUrls: ['./customer-bookings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBookingsComponent implements OnInit {
  customerBookings$?: Observable<Booking[] | null>;
  noResultsNotificationSeverity: NotificationSeverity = 'warning';
  noResultsNotificationSize: NotificationSize = 'regular';

  constructor(private readonly customerFacade: CustomerFacade, private readonly router: Router) {}

  ngOnInit() {
    this.getCustomerBookings();
    this.customerBookings$ = this.customerFacade.customerBookings$;
  }

  getCustomerBookings() {
    this.customerFacade.getBookings();
  }

  cancelBooking(bookingId: string, closeModal: () => void) {
    this.customerFacade
      .cancelBooking(bookingId)
      .pipe(
        take(1),
        tap(() => closeModal)
      )
      .subscribe();
  }

  changeBreadcrumb(index: number) {
    if (index === 0) {
      this.router.navigate(['/']);
    }
  }
}
