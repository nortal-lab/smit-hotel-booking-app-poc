import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { CustomerFacade } from '../facades/customer.facade';
import { Booking } from '../models/booking.interface';
import { NotificationSeverity } from '@egov/cvi-ng/lib/notification/notification';
import { NotificationSize, ToastService } from '@egov/cvi-ng';
import { Router } from '@angular/router';
import { UiImage } from '../models/ui/Image.type';
import { faBed, faRulerCombined, faUser } from '@fortawesome/free-solid-svg-icons';
import { TimeService } from '../services/time.service';

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
  roomImage: UiImage = {
    src: '/assets/images/room.jpg',
    alt: 'Room Image',
  };
  dateFormatString = 'dd.MM.yy';

  constructor(
    private readonly customerFacade: CustomerFacade,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly cd: ChangeDetectorRef,
    private readonly timeService: TimeService
  ) {}

  ngOnInit() {
    this.getCustomerBookings();
    this.customerBookings$ = this.customerFacade.customerBookings$;
  }

  getBadgeLabel(date: string) {
    let label = '';

    if (this.timeService.isTheSameDay(date)) {
      label = 'Today';
    }

    if (this.timeService.isFutureDate(date)) {
      label = this.timeService.daysUntilDate(date);
    } else if (this.timeService.isFutureDate(date)) {
      label = this.timeService.daysUntilDate(date);
    }
    return label;
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

  protected readonly String = String;
  protected readonly faUser = faUser;
  protected readonly faRulerCombined = faRulerCombined;
  protected readonly faBed = faBed;
}
