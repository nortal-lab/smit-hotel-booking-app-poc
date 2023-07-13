import { BookingProcessComponent, SortByPrice } from './booking-process.component';
import { MockService } from 'ng-mocks';
import { CustomerFacade } from '../facades/customer.facade';
import { map, Observable, of } from 'rxjs';
import { BedType, Room, RoomType } from '../models/room.interface';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRoles } from '../models/user-roles.enum';
import { LocalStorageService } from '../services/local-storage.service';

describe('BookingProcessComponent', () => {
  let component: BookingProcessComponent;

  const roomsMock = [
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
  ];

  describe('ngOnInit', () => {
    const customerFacadeMock = MockService(CustomerFacade, {
      getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string): Observable<Room[]> {
        return of(roomsMock);
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

    component = new BookingProcessComponent(customerFacadeMock, activatedRouteMock, authServiceMock, MockService(LocalStorageService), MockService(Router));

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
              expect(data).toEqual(roomsMock.reverse());
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
});
