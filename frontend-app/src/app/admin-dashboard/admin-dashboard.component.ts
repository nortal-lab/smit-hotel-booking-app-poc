import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

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

  constructor(private readonly employeeService: EmployeeService) {}

  ngOnInit() {
    this.bookings$ = this.getBookings();
    this.rooms$ = this.getRooms();
  }

  getBookings() {
    return this.employeeService.getActiveBookings();
  }

  getRooms() {
    return this.employeeService.getRooms();
  }
}
