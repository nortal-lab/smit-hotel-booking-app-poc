import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  convertDateFormat(date: string) {
    return format(new Date(date), 'dd.MM.yyyy');
  }
}
