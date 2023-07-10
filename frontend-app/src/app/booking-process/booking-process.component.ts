import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, EMPTY, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoomDTO } from '../models/room.interface';
import { RoomFacade } from '../facades/room.facade';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from '../services/auth.service';
import { StepsComponent, ToastService } from '@egov/cvi-ng';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingProcessComponent implements OnInit {
  labels = ['Select room', 'Personal information', 'Confirmation'];
  initialCurrentStep = this.getInitialCurrentStep();
  currentStepSubject$ = new BehaviorSubject(this.initialCurrentStep);
  dateFrom$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('dateFrom')));
  dateTo$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('dateTo')));
  roomCount$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('rooms')));
  guestCount$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('guests')));
  availableRooms$?: Observable<RoomDTO>;
  userCredentials$?: Observable<string>;

  constructor(
    private readonly roomFacade: RoomFacade,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly localStorage: LocalStorageService,
    private readonly toastService: ToastService
  ) {}

  private getInitialCurrentStep() {
    const currentStep = JSON.parse(this.localStorage.getData() || 'null')?.currentStep;
    return currentStep ?? 0;
  }

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
    this.setCurrentStepToLocalStorage(stepper.currentStepIndex);
  }

  private setCurrentStepToLocalStorage(currentStep: number) {
    this.localStorage.saveData(
      JSON.stringify({
        currentStep,
      })
    );
  }

  cancelBookingProcess(stepper: StepsComponent) {
    stepper.anyStepSelected = true;
    stepper.currentStepIndex = 0;
    stepper.hideStepsContent();
    stepper.setProgress(0);
    stepper.stepChange.emit(stepper.currentStepIndex);
    this.setCurrentStepToLocalStorage(stepper.currentStepIndex);
  }

  onStepChange(step: number) {
    this.currentStepSubject$.next(step);
    this.setCurrentStepToLocalStorage(step);
  }

  login() {
    this.authService.login().catch(() => {
      this.toastService.error('An error has happened. Please, try again in a while or contact administrator.');
    });
  }
}
