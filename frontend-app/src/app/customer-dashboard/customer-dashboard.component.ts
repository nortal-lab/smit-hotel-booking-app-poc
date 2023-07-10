import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDashboardComponent implements OnInit {
  results$?: Observable<any>;

  constructor(private readonly roomService: RoomService, private readonly router: Router) {}

  ngOnInit() {
    this.results$ = this.getCustomerBookings();
  }

  search() {
    this.router.navigate(['available-rooms'], {
      queryParams: {
        from: '2020-01-01',
        to: '2020-02-02',
        rooms: 1,
        guests: 2,
      },
    });
  }

  getCustomerBookings() {
    return this.roomService.getCustomerBookings();
  }
}
