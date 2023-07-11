import { Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
  constructor(private readonly customerService: CustomerService) {}

  getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string) {
    return this.customerService.getAvailableRooms(dateFrom, dateTo, guestCount);
  }

  getBookings() {
    return this.customerService.getBookings();
  }
}
