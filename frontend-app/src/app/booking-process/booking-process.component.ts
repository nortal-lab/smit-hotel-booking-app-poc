import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, EMPTY, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoomDTO } from '../models/room.interface';
import { RoomFacade } from '../facades/room.facade';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingProcessComponent implements OnInit {
  labels = ['Select room', 'Personal information', 'Confirmation'];
  currentStepSubject$ = new BehaviorSubject(0);
  dateFrom$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('from')));
  dateTo$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('to')));
  roomCount$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('rooms')));
  guestCount$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('guests')));
  availableRooms$?: Observable<RoomDTO>;
  userCredentials$?: Observable<string>;

  constructor(private readonly roomFacade: RoomFacade, private readonly activatedRoute: ActivatedRoute, private readonly authService: AuthService) {}

  ngOnInit() {
    this.availableRooms$ = combineLatest([this.dateFrom$, this.dateTo$, this.roomCount$, this.guestCount$]).pipe(
      switchMap(([dateFrom, dateTo, roomCount, guestCount]) =>
        dateFrom && dateTo && roomCount && guestCount ? this.roomFacade.getAvailableRooms(dateFrom, dateTo, roomCount, guestCount) : EMPTY
      )
    );

    this.userCredentials$ = this.authService.user$.pipe(map((user) => user.username));
  }

  nextStep() {
    this.currentStepSubject$.next(this.currentStepSubject$.getValue() + 1);
  }

  cancelBookingProcess() {
    this.currentStepSubject$.next(0);
  }

  onStepChange(step: number) {
    this.currentStepSubject$.next(step);
  }
}
