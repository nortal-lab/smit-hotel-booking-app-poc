import { NgModule } from '@angular/core';
import { CustomerReservationsComponent } from './customer-reservations.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DateFormatModule } from '../../shared/pipes/date-format.module';
import { UiModule } from '@egov/cvi-ng';

@NgModule({
  declarations: [CustomerReservationsComponent],
  exports: [CustomerReservationsComponent],
  providers: [],
  imports: [AsyncPipe, DateFormatModule, NgForOf, UiModule, NgIf],
})
export class CustomerReservationsModule {}
