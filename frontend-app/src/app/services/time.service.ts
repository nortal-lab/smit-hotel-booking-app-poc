import { Injectable } from '@angular/core';
import { addDays, format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  convertDateFormat(date: string, formatString: string) {
    return format(new Date(date), formatString);
  }

  convertDateServerFormat(date: string) {
    return date.split('.').reverse().join('-');
  }

  getTomorrowDate() {
    return addDays(new Date(), 1);
  }
}
