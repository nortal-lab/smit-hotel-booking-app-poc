import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchProperties } from '../models/search-properties.interface';
import { ToastService } from '@egov/cvi-ng';
import { LocalStorageService } from '../services/local-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePickerItem, GuestFormItem } from '../models/ui/search-container';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-search-homepage',
  templateUrl: './search-homepage.component.html',
  styleUrls: ['./search-homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHomepageComponent {
  todayDate = this.convertDateFormat(new Date().toString());
  tomorrowDate = this.getTomorrowDate();
  searchForm = new FormGroup({
    dateFrom: new FormControl(this.todayDate),
    dateTo: new FormControl(this.tomorrowDate),
    guests: new FormControl('2 guests'),
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

  constructor(
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly localStorage: LocalStorageService,
    private readonly timeService: TimeService
  ) {
    this.resetCurrentBookingStepInLocalStorage();
  }

  getTomorrowDate() {
    return this.convertDateFormat(this.timeService.getTomorrowDate().toString());
  }

  convertDateFormat(date: string) {
    return this.timeService.convertDateFormat(date);
  }

  convertDateServerFormat(date: string) {
    return this.timeService.convertDateServerFormat(date);
  }

  search(data: SearchProperties) {
    this.router
      .navigate(['booking'], {
        queryParams: {
          dateFrom: this.convertDateServerFormat(data.dateFrom),
          dateTo: this.convertDateServerFormat(data.dateTo),
          guests: data.guests.charAt(0),
        },
      })
      .catch(() => this.toastService.error('An error has happened. Please, try again in a while or contact administrator.'));
  }

  private resetCurrentBookingStepInLocalStorage() {
    this.localStorage.saveData(
      JSON.stringify({
        currentBookingStep: 0,
      })
    );
  }
}
