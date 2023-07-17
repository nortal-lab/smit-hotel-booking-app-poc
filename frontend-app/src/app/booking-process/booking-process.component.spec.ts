import { BookingProcessComponent, SortByPrice } from './booking-process.component';
import { MockService } from 'ng-mocks';
import { CustomerFacade } from '../facades/customer.facade';
import { map, Observable, of } from 'rxjs';
import { AvailableRooms, BedType, RoomType } from '../models/room.interface';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRoles } from '../models/user-roles.enum';
import { LocalStorageService } from '../services/local-storage.service';
import { BookingProgressService } from './booking-progress.service';

jest.mock('@egov/cvi-ng', () => {
  return {
    ToastService: jest.fn().mockImplementation(() => {
      return {
        // mock methods if needed
      };
    }),
  };
});

describe('BookingProcessComponent', () => {
  let component: BookingProcessComponent;

  const roomsMock = {
    startDate: new Date().toString(),
    endDate: new Date().toString(),
    availableRooms: [
      {
        airConditioning: true,
        balcony: true,
        bathrobeAndSlippers: true,
        bedsType: BedType.ONE_DOUBLE,
        freeBottledWater: true,
        freeWiFi: true,
        inRoomSafe: true,
        ironAndIroningBoard: true,
        peopleCapacity: 1,
        professionalHairDryer: true,
        rainShower: true,
        roomId: 'roomId',
        roomNumber: 100,
        roomSizeInSquareMeters: 20,
        roomType: RoomType.STANDARD_TWIN,
        smartTV: true,
        estimatedTaxes: 5,
        priceBeforeTaxes: 25,
        pricePerNightIncludingTaxes: '30',
      },
      {
        airConditioning: true,
        balcony: true,
        bathrobeAndSlippers: true,
        bedsType: BedType.ONE_DOUBLE,
        freeBottledWater: true,
        freeWiFi: true,
        inRoomSafe: true,
        ironAndIroningBoard: true,
        peopleCapacity: 1,
        professionalHairDryer: true,
        rainShower: true,
        roomId: 'roomId',
        roomNumber: 100,
        roomSizeInSquareMeters: 20,
        roomType: RoomType.STANDARD_TWIN,
        smartTV: true,
        estimatedTaxes: 5,
        priceBeforeTaxes: 25,
        pricePerNightIncludingTaxes: '30',
      },
    ],
  };

  const customerFacadeMock = MockService(CustomerFacade, {
    getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string): Observable<AvailableRooms> {
      return of(roomsMock);
    },
    bookRoom(roomId: string, startDate: string, endDate: string): Observable<Object> {
      return of();
    },
  });

  const activatedRouteMock = MockService(ActivatedRoute, {
    get queryParamMap(): Observable<ParamMap> {
      return of(
        convertToParamMap({
          dateFrom: '2020-02-02',
          dateTo: '2020-02-03',
          quests: '1',
        })
      );
    },
  });

  const authServiceMock = MockService(AuthService, {
    user$: of({
      role: UserRoles.CUSTOMER,
      familyName: '',
      givenName: '',
      email: '',
      personalIdentificationNumber: '',
    }),
  });

  const routerMock = MockService(Router);

  component = new BookingProcessComponent(
    customerFacadeMock,
    activatedRouteMock,
    authServiceMock,
    MockService(LocalStorageService),
    routerMock,
    MockService(BookingProgressService, {
      onCancelBookingProgress$: of(),
    })
  );

  describe('ngOnInit', () => {
    it('should get available rooms', (done) => {
      component.sortedAvailableRooms$
        .pipe(
          map((data, index) => {
            if (index === 1) {
              expect(data).toEqual(roomsMock);
            }
          })
        )
        .subscribe(() => {
          done();
        });

      component.ngOnInit();
    });

    it('should sort rooms in DESC order', (done) => {
      component.sortedAvailableRooms$
        .pipe(
          map((data, index) => {
            if (index === 1) {
              expect(data?.availableRooms).toEqual(roomsMock.availableRooms.reverse());
            }
          })
        )
        .subscribe(() => {
          done();
        });

      component.changeSort(SortByPrice.DESC);
    });

    it('should sort rooms in ASC order', (done) => {
      component.sortedAvailableRooms$
        .pipe(
          map((data, index) => {
            if (index === 1) {
              expect(data).toEqual(roomsMock);
            }
          })
        )
        .subscribe(() => {
          done();
        });

      component.changeSort(SortByPrice.ASC);
    });
  });

  describe('onStepChange', () => {
    it('should trigger next step', () => {
      const currentStepSubjectSpy = jest.spyOn(component.currentStepSubject$, 'next');

      component.currentStepSubject$
        .pipe(
          map((data, index) => {
            if (index === 1) {
              expect(data).toEqual(1);
              expect(currentStepSubjectSpy).toBeCalled();
            }
          })
        )
        .subscribe();

      component.onStepChange(1);
    });
  });

  describe('confirmBooking', () => {
    it('should trigger booking confirmation', (done) => {
      const bookRoomSpy = jest.spyOn(customerFacadeMock, 'bookRoom');

      component.confirmBooking('roomId', 'startDate', 'endDate');
      expect(bookRoomSpy).toHaveBeenCalled();
      done();
    });
  });

  describe('changeBreadcrumb', () => {
    it('should navigate to homepage', () => {
      const routerSpy = jest.spyOn(routerMock, 'navigate');

      component.changeBreadcrumb(0);
      expect(routerSpy).toHaveBeenCalledWith(['/']);
      jest.clearAllMocks();
    });

    it('should not navigate to homepage', () => {
      const routerSpy = jest.spyOn(routerMock, 'navigate');

      component.changeBreadcrumb(1);
      expect(routerSpy).not.toHaveBeenCalled();
    });
  });
});
