import { CustomerFacade } from './customer.facade';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';
import { BedType, Room, RoomType } from '../models/room.interface';
import { of } from 'rxjs';
import { Booking } from '../models/booking.interface';
import { BookingStatus } from '../models/booking-status.enum';
import { MockService } from 'ng-mocks';
import { TimeService } from '../services/time.service';
import { ToastService } from '@egov/cvi-ng';

jest.mock('@egov/cvi-ng', () => {
  return {
    ToastService: jest.fn().mockImplementation(() => {
      return {
        // mock methods if needed
      };
    }),
  };
});

describe('CustomerFacade', () => {
  let facade: CustomerFacade;
  let customerService: CustomerService;
  let authService: AuthService;
  let timeService = new TimeService();

  beforeEach(() => {
    // @ts-ignore
    customerService = new CustomerService(null);
    // @ts-ignore
    authService = new AuthService(null, null);
    facade = new CustomerFacade(customerService, authService, timeService, MockService(ToastService));
  });

  describe('getAvailableRooms', () => {
    it('should return mapped available rooms', (done) => {
      const rooms: Room[] = [
        {
          roomId: 'room1',
          roomNumber: 1,
          roomSizeInSquareMeters: 35,
          roomType: RoomType.STANDARD_DOUBLE,
          bedsType: BedType.ONA_KING_AND_ONE_SOFA,
          priceBeforeTaxes: 100,
          pricePerNightIncludingTaxes: '120',
          estimatedTaxes: 20,
          peopleCapacity: 2,
          freeWiFi: true,
          smartTV: true,
          airConditioning: true,
          inRoomSafe: true,
          freeBottledWater: true,
          bathrobeAndSlippers: true,
          balcony: true,
          professionalHairDryer: true,
          rainShower: true,
          ironAndIroningBoard: true,
        },
      ];

      const startDate = '2023-07-25';
      const endDate = '2023-07-30';
      const guestCount = '2';

      // @ts-ignore
      jest.spyOn(customerService, 'getAvailableRooms').mockReturnValue(of({ startDate, endDate, availableRooms: rooms }));

      facade.getAvailableRooms(startDate, endDate, guestCount).subscribe((result) => {
        expect(result).toEqual({ startDate, endDate, availableRooms: rooms });
      });
      done();
    });
  });

  describe('getBookings', () => {
    it('should get bookings and enrich them with room details', () => {
      const bookings: Booking[] = [
        // @ts-ignore
        {
          bookingId: 'booking1',
          customerId: 'cust1',
          customerFirstName: 'John',
          customerLastName: 'Doe',
          roomType: RoomType.STANDARD_DOUBLE,
          roomId: 'room1',
          roomNumber: 1,
          startDate: '2023-07-25',
          endDate: '2023-07-30',
          status: BookingStatus.CONFIRMED,
        },
      ];

      const room: Room = {
        roomId: 'room1',
        roomNumber: 1,
        roomSizeInSquareMeters: 35,
        roomType: RoomType.STANDARD_DOUBLE,
        bedsType: BedType.ONA_KING_AND_ONE_SOFA,
        priceBeforeTaxes: 100,
        pricePerNightIncludingTaxes: '120',
        estimatedTaxes: 20,
        peopleCapacity: 2,
        freeWiFi: true,
        smartTV: true,
        airConditioning: true,
        inRoomSafe: true,
        freeBottledWater: true,
        bathrobeAndSlippers: true,
        balcony: true,
        professionalHairDryer: true,
        rainShower: true,
        ironAndIroningBoard: true,
      };

      jest.spyOn(customerService, 'getBookings').mockReturnValue(of(bookings));
      // @ts-ignore
      jest.spyOn(customerService, 'getRoom').mockReturnValue(of(room));

      facade.getBookings();

      facade.customerBookings$.subscribe((result) => {
        expect(result).toEqual([
          {
            ...bookings[0],
            room,
          },
        ]);
      });
    });
  });

  describe('cancelBooking', () => {
    it('should cancel booking and remove it from customerBookings', (done) => {
      const bookingId = 'booking1';
      const bookings: Booking[] = [
        // @ts-ignore
        {
          bookingId,
          customerId: 'cust1',
          customerFirstName: 'John',
          customerLastName: 'Doe',
          roomType: RoomType.STANDARD_DOUBLE,
          roomId: 'room1',
          roomNumber: 1,
          startDate: '2023-07-25',
          endDate: '2023-07-30',
          status: BookingStatus.CONFIRMED,
        },
      ];

      facade.customerBookings.next(bookings);
      // @ts-ignore
      jest.spyOn(customerService, 'cancelBooking').mockReturnValue(of(null));

      facade.cancelBooking(bookingId).subscribe(() => {
        facade.customerBookings$.subscribe((customerBookings) => {
          expect(customerBookings).toEqual([]);
          done();
        });
      });
    });
  });
});
