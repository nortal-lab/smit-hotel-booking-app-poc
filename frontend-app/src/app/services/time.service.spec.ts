import { TimeService } from './time.service';
import { addDays } from 'date-fns';

describe('TimeService', () => {
  let service: TimeService;

  beforeEach(() => {
    service = new TimeService();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should convert date format correctly', () => {
    const date = '2023-07-10';
    const convertedDate = '10.07.2023';
    expect(service.convertDateFormat(date, 'dd.MM.yyyy')).toBe(convertedDate);
  });

  it('should be false when day is -1 day', () => {
    const pastDateMock = '2023-02-23T12:00:00';
    expect(service.isFutureDate(pastDateMock)).toBeFalsy();
  });

  it('should be false when day is the same', () => {
    const pastDateMock = '2023-02-24T12:00:00';
    expect(service.isFutureDate(pastDateMock)).toBeFalsy();
  });

  it('should be false when day is in the future', () => {
    const pastDateMock = '2802-02-25T12:00:00';
    expect(service.isFutureDate(pastDateMock)).toBeTruthy();
  });

  it('should be future Date', () => {
    const futureDateMock = '2802-03-27T12:00:00';
    expect(service.isFutureDate(futureDateMock)).toBeTruthy();
  });

  it('should be falsy future Date', () => {
    const pastDateMock = '2023-01-27T12:00:00';
    expect(service.isFutureDate(pastDateMock)).toBeFalsy();
  });

  it('should be distance of 3 days', () => {
    const dateMock = addDays(new Date(), 3).toDateString();
    expect(service.daysUntilDate(dateMock)).toEqual('3 days');
  });

  it('should be passed distance of 11 days', () => {
    const dateMock = addDays(new Date(), 11).toDateString();
    expect(service.daysUntilDate(dateMock)).toEqual('11 days');
  });

  it('should return the difference in hours between two dates', () => {
    const firstDate = '2023-07-17T12:00:00.000Z';
    const secondDate = '2023-07-17T15:00:00.000Z';

    const difference = service.differenceInHours(secondDate, firstDate);

    expect(difference).toBe(3);
  });

  it('should return a negative number if the first date is after the second date', () => {
    const firstDate = '2023-07-18T12:00:00.000Z';
    const secondDate = '2023-07-17T15:00:00.000Z';

    const difference = service.differenceInHours(secondDate, firstDate);

    expect(difference).toBe(-21);
  });
});
