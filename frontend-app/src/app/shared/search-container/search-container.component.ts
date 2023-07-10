import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss'],
})
export class SearchContainerComponent {
  rooms = ['1 room', '2 rooms'];
  guests = ['1 guest', '2 guests'];

  @Output() onSearch = new EventEmitter<void>();

  search() {
    this.onSearch.emit();
  }
}
