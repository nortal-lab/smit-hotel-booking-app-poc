import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, EMPTY, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoomDTO } from '../models/room.interface';
import { RoomFacade } from '../facades/room.facade';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from '../services/auth.service';
import { StepsComponent } from '@egov/cvi-ng';

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingProcessComponent implements OnInit {
  labels = ['Select room', 'Personal information', 'Confirmation'];
  currentStepSubject$ = new BehaviorSubject(0);
  dateFrom$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('dateFrom')));
  dateTo$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('dateTo')));
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

  nextStep(stepper: StepsComponent) {
    stepper.anyStepSelected = true;
    stepper.currentStepIndex = stepper.currentStepIndex! + 1;
    stepper.hideStepsContent();
    stepper.setProgress(stepper.currentStepIndex! + 1);
    stepper.stepChange.emit(stepper.currentStepIndex);
  }

  cancelBookingProcess(stepper: StepsComponent) {
    stepper.anyStepSelected = true;
    stepper.currentStepIndex = 0;
    stepper.hideStepsContent();
    stepper.setProgress(0);
    stepper.stepChange.emit(stepper.currentStepIndex);
  }

  onStepChange(step: number) {
    this.currentStepSubject$.next(step);
  }
}
