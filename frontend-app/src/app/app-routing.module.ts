import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SearchHomepageComponent } from './search-homepage/search-homepage.component';
import { BookingProcessComponent } from './booking-process/booking-process.component';
import { CustomerBookingsComponent } from './customer-bookings/customer-bookings.component';
import { CustomerGuard } from './guards/customer.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardComponent,
    children: [
      {
        path: '',
        component: SearchHomepageComponent,
      },
      {
        path: 'booking',
        component: BookingProcessComponent,
      },
      {
        path: 'my-reservations',
        component: CustomerBookingsComponent,
        canActivate: [AuthGuard, CustomerGuard],
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
