import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, EMPTY, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoomDTO } from '../models/room.interface';
import { CustomerFacade } from '../facades/customer.facade';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from '../services/auth.service';
import { NotificationSize, ToastService } from '@egov/cvi-ng';
import { LocalStorageService } from '../services/local-storage.service';
import { NotificationSeverity } from '@egov/cvi-ng/lib/notification/notification';
import { AppStepsComponent } from '../app-ui/steps/steps/steps.component';

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
  noResultsNotificationSeverity: NotificationSeverity = 'warning';
  noResultsNotificationSize: NotificationSize = 'regular';
  signInNotificationSeverity: NotificationSeverity = 'info';
  signInNotificationSize: NotificationSize = 'compact';
  confirmationNotificationSeverity: NotificationSeverity = 'success';
  confirmationNotificationSize: NotificationSize = 'regular';
  showConfirmationNotification = false;

  constructor(
    private readonly customerFacade: CustomerFacade,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly localStorage: LocalStorageService,
    private readonly toastService: ToastService
  ) {}

  private getInitialCurrentStep() {
    const currentStep = JSON.parse(this.localStorage.getData() || 'null')?.currentBookingStep;
    return currentStep ?? 0;
  }

  ngOnInit() {
    this.availableRooms$ = combineLatest([this.dateFrom$, this.dateTo$, this.roomCount$, this.guestCount$]).pipe(
      switchMap(([dateFrom, dateTo, roomCount, guestCount]) =>
        dateFrom && dateTo && roomCount && guestCount ? this.customerFacade.getAvailableRooms(dateFrom, dateTo, guestCount) : EMPTY
      )
    );

    this.userCredentials$ = this.authService.user$.pipe(map((user) => user.username));
  }

  nextStep(stepper: AppStepsComponent) {
    stepper.anyStepSelected = true;
    stepper.currentStepIndex = stepper.currentStepIndex! + 1;
    stepper.hideStepsContent();
    stepper.setProgress(stepper.currentStepIndex! + 1);
    stepper.stepChange.emit(stepper.currentStepIndex);
    this.setCurrentStepToLocalStorage(stepper.currentStepIndex);
  }

  private setCurrentStepToLocalStorage(currentBookingStep: number) {
    this.localStorage.saveData(
      JSON.stringify({
        currentBookingStep,
      })
    );
  }

  cancelBookingProcess(stepper: AppStepsComponent) {
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

  confirmBooking() {
    this.showConfirmationNotification = true;
    this.onStepChange(0);
  }
}
