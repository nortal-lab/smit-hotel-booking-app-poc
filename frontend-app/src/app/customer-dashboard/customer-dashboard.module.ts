import { NgModule } from '@angular/core';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [CustomerDashboardComponent],
  exports: [CustomerDashboardComponent],
  providers: [],
  imports: [UiModule, FormsModule, CommonModule, HttpClientModule, RouterOutlet],
})
export class CustomerDashboardModule {}
