import { NgModule } from '@angular/core';
import { CustomerBookingsComponent } from './customer-bookings.component';
import { CommonModule } from '@angular/common';
import { UiModule } from '@egov/cvi-ng';

@NgModule({
  declarations: [CustomerBookingsComponent],
  exports: [CustomerBookingsComponent],
  providers: [],
  imports: [CommonModule, UiModule],
})
export class CustomerBookingsModule {}
