import { NgModule } from '@angular/core';
import { CustomerBookingsComponent } from './customer-bookings.component';
import { CommonModule } from '@angular/common';
import { UiModule } from '@egov/cvi-ng';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomerBookingsComponent],
  exports: [CustomerBookingsComponent],
  providers: [],
  imports: [CommonModule, UiModule, RouterModule],
})
export class CustomerBookingsModule {}
