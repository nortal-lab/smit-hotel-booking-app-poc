import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './search-homepage.component.html',
  styleUrls: ['./search-homepage.component.scss'],
})
export class SearchHomepageComponent {
  constructor(private readonly router: Router) {}

  search() {
    this.router.navigate(['booking'], {
      queryParams: {
        from: '2020-01-01',
        to: '2020-02-02',
        rooms: 1,
        guests: 2,
      },
    });
  }
}
