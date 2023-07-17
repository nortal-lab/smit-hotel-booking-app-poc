import { Injectable } from '@angular/core';
import { addDays, format, formatDistance, isAfter, isSameDay, differenceInHours } from 'date-fns';

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

  isTheSameDay(date: string): boolean {
    const providedDate = new Date(date);
    return isSameDay(providedDate, new Date());
  }

  isFutureDate(date: string): boolean {
    const futureDate = new Date(date);
    const now = new Date();
    return !isSameDay(futureDate, now) && isAfter(futureDate, now);
  }

  daysUntilDate(futureDate: string): string {
    const now = new Date();
    const date = new Date(futureDate);
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

    return formatDistance(utc1, utc2, {
      includeSeconds: false,
    });
  }

  differenceInHours(firstDate: string, secondDate: string) {
    return differenceInHours(new Date(firstDate), new Date(secondDate));
  }
}
