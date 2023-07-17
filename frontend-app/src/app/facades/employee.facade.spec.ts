import { of } from 'rxjs';
import { EmployeeFacade } from './employee.facade';
import { EmployeeService } from '../services/employee.service';
import { Booking } from '../models/booking.interface';
import { RoomType } from '../models/room.interface';
import { BookingStatus } from '../models/booking-status.enum';

describe('EmployeeFacade', () => {
  let facade: EmployeeFacade;
  let employeeService: EmployeeService;

  beforeEach(() => {
    // @ts-ignore
    employeeService = new EmployeeService(null);
    facade = new EmployeeFacade(employeeService);
  });

  describe('getRooms', () => {
    it('should return the result from EmployeeService.getRooms', () => {
      const rooms = ['room1', 'room2'];
      jest.spyOn(employeeService, 'getRooms').mockReturnValue(of(rooms));

      facade.getRooms().subscribe((result) => {
        expect(result).toBe(rooms);
      });
    });
  });

  describe('getActiveBookings', () => {
    it('should get active bookings from the service and enrich them with room details', (done) => {
      const bookings: Booking[] = [
        {
          bookingIdentifierNumber: 1,
          bookingId: 'booking1',
          creationDate: '2023-07-19',
          customerFirstName: 'John',
          customerLastName: 'Doe',
          roomType: RoomType.SINGLE,
          customerId: 'cust1',
          endDate: '2023-07-25',
          roomId: 'room1',
          roomNumber: 1,
          startDate: '2023-07-20',
          status: BookingStatus.CONFIRMED,
        },
      ];

      const room = {
        roomNumber: 1,
        roomType: RoomType.SINGLE,
      };

      jest.spyOn(employeeService, 'getActiveBookings').mockReturnValue(of(bookings));
      // @ts-ignore
      jest.spyOn(employeeService, 'getRoom').mockReturnValue(of(room));

      facade.getActiveBookings().subscribe((result) => {
        expect(result).toEqual([
          {
            ...bookings[0],
            roomNumber: room.roomNumber,
            roomType: room.roomType,
          },
        ]);
        done();
      });
    });
  });

  describe('cancelBooking', () => {
    it('should cancel booking and remove it from activeBookings', (done) => {
      const bookingId = 'booking1';
      const bookings: Booking[] = [
        {
          bookingIdentifierNumber: 1,
          bookingId,
          creationDate: '2023-07-19',
          customerFirstName: 'John',
          customerLastName: 'Doe',
          roomType: RoomType.SINGLE,
          customerId: 'cust1',
          endDate: '2023-07-25',
          roomId: 'room1',
          roomNumber: 1,
          startDate: '2023-07-20',
          status: BookingStatus.CONFIRMED,
        },
      ];

      facade.activeBookings.next(bookings);
      // @ts-ignore
      jest.spyOn(employeeService, 'cancelBooking').mockReturnValue(of(null));

      facade.cancelBooking(bookingId).subscribe(() => {
        facade.activeBookings$.subscribe((activeBookings) => {
          expect(activeBookings).toEqual([]);
          done();
        });
      });
    });
  });
});
