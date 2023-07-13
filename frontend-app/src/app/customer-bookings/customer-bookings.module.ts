import { NgModule } from '@angular/core';
import { CustomerBookingsComponent } from './customer-bookings.component';
import { CommonModule } from '@angular/common';
import { UiModule } from '@egov/cvi-ng';
import { RouterModule } from '@angular/router';
import { AppUiModule } from '../app-ui/app-ui.module';

@NgModule({
  declarations: [CustomerBookingsComponent],
  exports: [CustomerBookingsComponent],
  providers: [],
  imports: [CommonModule, UiModule, RouterModule, AppUiModule],
})
export class CustomerBookingsModule {}
