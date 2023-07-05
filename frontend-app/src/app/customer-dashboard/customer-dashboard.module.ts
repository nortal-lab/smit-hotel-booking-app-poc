import { NgModule } from '@angular/core';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@NgModule({
  declarations: [CustomerDashboardComponent],
  exports: [CustomerDashboardComponent],
  providers: [],
  imports: [UiModule, FormsModule, NgIf, AsyncPipe, JsonPipe],
})
export class CustomerDashboardModule {}
