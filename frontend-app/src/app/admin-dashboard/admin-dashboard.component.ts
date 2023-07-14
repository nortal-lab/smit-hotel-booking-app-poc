import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeFacade } from '../facades/employee.facade';
import { Booking } from '../models/booking.interface';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  bookings$?: Observable<Booking[]>;
  rooms$?: Observable<any>;

  constructor(private readonly employeeFacade: EmployeeFacade) {}

  ngOnInit() {
    this.getBookings();
    this.bookings$ = this.employeeFacade.activeBookings$;
    this.rooms$ = this.getRooms();
  }

  getBookings() {
    return this.employeeFacade.getActiveBookings().subscribe();
  }

  getRooms() {
    return this.employeeFacade.getRooms();
  }
}
