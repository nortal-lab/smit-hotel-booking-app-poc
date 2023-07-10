import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchProperties } from '../models/search-properties.interface';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './search-homepage.component.html',
  styleUrls: ['./search-homepage.component.scss'],
})
export class SearchHomepageComponent {
  constructor(private readonly router: Router) {}

  search() {
    const searchProperties: SearchProperties = {
      from: '2020-01-01',
      to: '2020-02-02',
      rooms: 1,
      guests: 2,
    };
    this.router.navigate(['booking'], {
      queryParams: searchProperties,
    });
  }
}
