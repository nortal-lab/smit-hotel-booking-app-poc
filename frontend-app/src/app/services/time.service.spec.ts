import { TimeService } from './time.service';

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
    expect(service.convertDateFormat(date)).toBe(convertedDate);
  });
});
