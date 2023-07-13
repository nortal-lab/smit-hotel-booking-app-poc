import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const inputComponentValueAccessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchInputComponent),
  multi: true,
};

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [inputComponentValueAccessor],
})
export class SearchInputComponent implements ControlValueAccessor {
  /** Placeholder */
  @Input() placeholder = '';

  /** Emit value on model change */
  @Output() valueChange = new EventEmitter<any>();

  /** Internal */
  _internalValue?: any;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChanged: (_: any) => void = () =>
    this.valueChange.emit(this._internalValue);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => any = () => {};

  @HostBinding('class') get getHostClasses(): string {
    return ``;
  }

  setValue(value: any) {
    this.onChanged(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this._internalValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
