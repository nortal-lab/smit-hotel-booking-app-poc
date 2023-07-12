import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeFacade } from '../facades/employee.facade';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  bookings$?: Observable<any>;
  rooms$?: Observable<any>;
  reservationsTableHeaderLabels = ['Booking No.', 'Room', 'Guest', 'Dates'];

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

  cancelBooking(bookingId: string) {
    this.employeeFacade.cancelBooking(bookingId);
  }
}
