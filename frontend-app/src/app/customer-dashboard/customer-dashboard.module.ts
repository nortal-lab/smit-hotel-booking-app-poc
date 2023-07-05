import { NgModule } from '@angular/core';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CustomerDashboardComponent],
  exports: [CustomerDashboardComponent],
  providers: [],
  imports: [UiModule, FormsModule, CommonModule, HttpClientModule],
})
export class CustomerDashboardModule {}
