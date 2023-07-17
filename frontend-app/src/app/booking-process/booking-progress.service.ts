import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingProgressService {
  private cancelBookingProgressSubject$ = new Subject<void>();
  onCancelBookingProgress$ = this.cancelBookingProgressSubject$.asObservable();

  cancelBookingProgress() {
    this.cancelBookingProgressSubject$.next();
  }
}
