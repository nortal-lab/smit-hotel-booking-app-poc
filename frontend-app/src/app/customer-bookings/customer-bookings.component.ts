import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { CustomerFacade } from '../facades/customer.facade';
import { Booking } from '../models/booking.interface';
import { NotificationSeverity } from '@egov/cvi-ng/lib/notification/notification';
import { NotificationSize, ToastService } from '@egov/cvi-ng';
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
  disableBookingCancelling = false;

  constructor(
    private readonly customerFacade: CustomerFacade,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getCustomerBookings();
    this.customerBookings$ = this.customerFacade.customerBookings$;
  }

  getCustomerBookings() {
    this.customerFacade.getBookings();
  }

  cancelBooking(bookingId: string, closeModal: () => void) {
    this.disableBookingCancelling = true;

    this.customerFacade
      .cancelBooking(bookingId)
      .pipe(
        take(1),
        tap(() => {
          closeModal;
          this.disableBookingCancelling = false;
        }),
        catchError((error) => {
          this.disableBookingCancelling = false;
          this.cd.detectChanges();
          return of(this.toastService.error(error.error.detail));
        })
      )
      .subscribe();
  }

  changeBreadcrumb(index: number) {
    if (index === 0) {
      this.router.navigate(['/']);
    }
  }
}
