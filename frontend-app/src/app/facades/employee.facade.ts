import { Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFacade {
  constructor(private readonly employeeService: EmployeeService) {}

  getRooms() {
    return this.employeeService.getRooms();
  }

  getActiveBookings() {
    return this.employeeService.getActiveBookings();
  }
}
