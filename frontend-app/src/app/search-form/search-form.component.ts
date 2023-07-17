import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchProperties } from '../models/search-properties.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@egov/cvi-ng';
import { TimeService } from '../services/time.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePickerItem, GuestFormItem } from '../models/ui/search-container';
import { combineLatest, map, take } from 'rxjs';
import { BookingProgressService } from '../booking-process/booking-progress.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  dateFormatString = 'dd.MM.yyyy';
  todayDate = this.convertDateFormat(new Date().toString());
  tomorrowDate = this.getTomorrowDate();
  guestCount = '2';
  searchForm = new FormGroup({
    dateFrom: new FormControl(this.todayDate),
    dateTo: new FormControl(this.tomorrowDate),
    guests: new FormControl(this.guestCount),
  });
  guestItem: GuestFormItem = {
    label: 'Guests',
    htmlId: 'guests',
    formControlName: 'guests',
    labelId: 'id',
    placeholder: 'Guests',
    items: ['1 guest', '2 guests', '3 guests'],
  };

  datePickers: DatePickerItem[] = [
    {
      label: 'date',
      htmlId: 'date-from',
      formControlName: 'dateFrom',
      placeholder: 'date',
    },
    {
      label: 'date',
      htmlId: 'date-to',
      formControlName: 'dateTo',
      placeholder: 'date',
    },
  ];

  dateFrom$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('dateFrom')));
  dateTo$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('dateTo')));
  guestCount$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('peopleCapacity')));

  constructor(
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly timeService: TimeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookingProgressService: BookingProgressService
  ) {
    combineLatest([this.dateFrom$, this.dateTo$, this.guestCount$])
      .pipe(take(1))
      .subscribe(([dateFrom, dateTo, guestCount]) => {
        if (dateFrom) {
          this.todayDate = dateFrom;
        }
        if (dateTo) {
          this.tomorrowDate = dateTo;
        }

        if (guestCount) {
          this.guestCount = guestCount;
        }

        this.searchForm = new FormGroup({
          dateFrom: new FormControl(this.todayDate),
          dateTo: new FormControl(this.tomorrowDate),
          guests: new FormControl(this.guestCount + ' guests'),
        });
      });
  }

  search(data: SearchProperties) {
    this.router
      .navigate(['booking'], {
        queryParams: {
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          peopleCapacity: data.guests.charAt(0),
        },
      })
      .then(() => this.bookingProgressService.cancelBookingProgress())
      .catch(() => this.toastService.error('An error has happened. Please, try again in a while or contact administrator.'));
  }

  convertDateServerFormat(date: string) {
    return this.timeService.convertDateServerFormat(date);
  }

  getTomorrowDate() {
    return this.convertDateFormat(this.timeService.getTomorrowDate().toString());
  }

  convertDateFormat(date: string) {
    return this.timeService.convertDateFormat(date, 'dd.MM.yyyy');
  }
}
