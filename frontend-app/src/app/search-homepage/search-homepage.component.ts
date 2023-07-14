import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './search-homepage.component.html',
  styleUrls: ['./search-homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHomepageComponent {
  constructor(private readonly router: Router, private readonly localStorage: LocalStorageService) {
    this.resetCurrentBookingStepInLocalStorage();
  }

  private resetCurrentBookingStepInLocalStorage() {
    this.localStorage.saveData(
      JSON.stringify({
        currentBookingStep: 0,
      })
    );
  }
}
