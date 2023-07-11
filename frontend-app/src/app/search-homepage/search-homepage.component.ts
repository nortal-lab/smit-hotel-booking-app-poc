import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchProperties } from '../models/search-properties.interface';
import { ToastService } from '@egov/cvi-ng';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './search-homepage.component.html',
  styleUrls: ['./search-homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHomepageComponent {
  constructor(private readonly router: Router, private readonly toastService: ToastService, private readonly localStorage: LocalStorageService) {
    this.resetCurrentBookingStepInLocalStorage();
  }

  search() {
    const searchProperties: SearchProperties = {
      dateFrom: '2020-01-01',
      dateTo: '2020-02-02',
      rooms: 1,
      guests: 2,
    };
    this.router
      .navigate(['booking'], {
        queryParams: searchProperties,
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
