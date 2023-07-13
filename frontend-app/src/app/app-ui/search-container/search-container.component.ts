import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePickerItem, GuestFormItem } from 'src/app/models/ui/search-container';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
})
export class SearchContainerComponent {
  @Input() form!: FormGroup;
  @Input() guestItem!: GuestFormItem;
  @Input() datePickers: DatePickerItem[] = [];
  @Output() handleSubmit: EventEmitter<any> = new EventEmitter<any>();

  onSubmit() {
    this.handleSubmit.emit(this.form.value);
  }
}
