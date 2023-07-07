import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  user$?: Observable<User>;
  results$?: Observable<any>;
  constructor(private readonly authService: AuthService, private readonly roomService: RoomService) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.results$ = this.getEmployeeBookings();
  }

  getEmployeeBookings() {
    return this.roomService.getEmployeeBookings();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
