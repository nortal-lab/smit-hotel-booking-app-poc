import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
})
export class CustomerDashboardComponent implements OnInit {
  user$?: Observable<User>;
  results$?: Observable<any>;

  constructor(private readonly authService: AuthService, private readonly roomService: RoomService) {}

  ngOnInit() {
    this.user$ = this.authService.user$;

    this.results$ = this.getCustomerBookings();
  }

  getCustomerBookings() {
    return this.roomService.getCustomerBookings();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
