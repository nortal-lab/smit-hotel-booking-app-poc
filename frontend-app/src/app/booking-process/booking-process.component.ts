import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, EMPTY, map, Observable, switchMap, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../models/room.interface';
import { CustomerFacade } from '../facades/customer.facade';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from '../services/auth.service';
import { NotificationSize, ToastService } from '@egov/cvi-ng';
import { LocalStorageService } from '../services/local-storage.service';
import { NotificationSeverity } from '@egov/cvi-ng/lib/notification/notification';
import { AppStepsComponent } from '../app-ui/steps/steps/steps.component';
import { SortOrder } from '../models/sort-order.enum';
import { UiImage } from '../models/ui/Image.type';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingProcessComponent implements OnInit {
  labels = ['Select room', 'Personal information', 'Confirmation'];
  availableRoomsSortingItems = [SortByPrice.ASC, SortByPrice.DESC];
  initialCurrentStep = this.getInitialCurrentStep();
  currentStepSubject$ = new BehaviorSubject(this.initialCurrentStep);
  dateFrom$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('dateFrom')));
  dateTo$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('dateTo')));
  roomCount$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('rooms')));
  guestCount$ = this.activatedRoute.queryParamMap.pipe(map((paramMap) => paramMap.get('guests')));
  private availableRooms$ = new BehaviorSubject<Room[] | null>(null);
  sortedAvailableRooms$ = this.availableRooms$.asObservable();
  sortOrder$ = new BehaviorSubject<SortOrder>(SortOrder.ASC);
  userCredentials$?: Observable<User>;
  noResultsNotificationSeverity: NotificationSeverity = 'warning';
  noResultsNotificationSize: NotificationSize = 'regular';
  signInNotificationSeverity: NotificationSeverity = 'info';
  signInNotificationSize: NotificationSize = 'compact';
  confirmationNotificationSeverity: NotificationSeverity = 'success';
  confirmationNotificationSize: NotificationSize = 'regular';
  showConfirmationNotification = false;
  roomImage: UiImage = {
    src: '/assets/images/room.jpg',
    alt: 'Room Image',
  };
  selectedRoom = this.getSelectedRoomFromLocalStorage();

  constructor(
    private readonly customerFacade: CustomerFacade,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly localStorage: LocalStorageService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  private getInitialCurrentStep() {
    const currentStep = JSON.parse(this.localStorage.getData() || 'null')?.currentBookingStep;
    return currentStep ?? 0;
  }

  private getSelectedRoomFromLocalStorage() {
    const selectedRoom = JSON.parse(this.localStorage.getData() || 'null')?.selectedRoom;
    return selectedRoom ?? null;
  }

  ngOnInit() {
    combineLatest([this.dateFrom$, this.dateTo$, this.roomCount$, this.guestCount$, this.sortOrder$])
      .pipe(
        take(1),
        switchMap(([dateFrom, dateTo, roomCount, guestCount, sortOrder]) =>
          dateFrom && dateTo && roomCount && guestCount
            ? this.customerFacade.getAvailableRooms(dateFrom, dateTo, guestCount).pipe(map((rooms) => this.sortRoomsByPrice(rooms, sortOrder)))
            : EMPTY
        ),
        tap((rooms) => this.availableRooms$.next(rooms))
      )
      .subscribe();

    this.userCredentials$ = this.authService.user$;
  }

  private sortRoomsByPrice(rooms: Room[], sortOrder: SortOrder) {
    const roomsCopy = structuredClone(rooms);
    return roomsCopy.sort((a, b) =>
      sortOrder === SortOrder.ASC
        ? Number(a.pricePerNightIncludingTaxes) - Number(b.pricePerNightIncludingTaxes)
        : Number(b.pricePerNightIncludingTaxes) - Number(a.pricePerNightIncludingTaxes)
    );
  }

  changeSort(sortOrder: SortByPrice) {
    this.sortOrder$.next(sortOrder === SortByPrice.ASC ? SortOrder.ASC : SortOrder.DESC);
    const availableRooms = this.availableRooms$.getValue();
    if (availableRooms) {
      this.availableRooms$.next(this.sortRoomsByPrice(availableRooms, this.sortOrder$.getValue()));
    }
  }

  nextStep(stepper: AppStepsComponent, room?: Room) {
    stepper.anyStepSelected = true;
    stepper.currentStepIndex = stepper.currentStepIndex! + 1;
    stepper.hideStepsContent();
    stepper.setProgress(stepper.currentStepIndex! + 1);
    stepper.stepChange.emit(stepper.currentStepIndex);
    this.setCurrentStepToLocalStorage(stepper.currentStepIndex);
    if (room) {
      this.selectedRoom = room;
      this.setSelectedRoomToLocalStorage(room);
    }
  }

  private setSelectedRoomToLocalStorage(room: Room) {
    const currentLocalStorageData = JSON.parse(this.localStorage.getData() ?? 'null') ?? {};
    this.localStorage.saveData(
      JSON.stringify({
        ...currentLocalStorageData,
        selectedRoom: room,
      })
    );
  }

  private setCurrentStepToLocalStorage(currentBookingStep: number) {
    const currentLocalStorageData = JSON.parse(this.localStorage.getData() ?? 'null') ?? {};

    this.localStorage.saveData(
      JSON.stringify({
        ...currentLocalStorageData,
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
    this.customerFacade
      .bookRoom()
      .pipe(
        take(1),
        tap(() => {
          this.showConfirmationNotification = true;
          this.onStepChange(0);
        })
      )
      .subscribe();
  }

  changeBreadcrumb(index: number) {
    if (index === 0) {
      this.router.navigate(['/']);
    }
  }
}

export enum SortByPrice {
  ASC = 'Price (low to high)',
  DESC = 'Price (high to low)',
}
