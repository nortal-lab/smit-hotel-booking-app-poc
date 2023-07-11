import { DateFormatPipe } from './date-format.pipe';
import { TimeService } from '../../services/time.service';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;
  let timeService: TimeService;

  beforeEach(() => {
    timeService = new TimeService();
    pipe = new DateFormatPipe(timeService);
  });

  it('should be created', () => {
    expect(pipe).toBeDefined();
  });

  it('should return the converted date format', () => {
    const date = '2023-07-10';
    const convertedDate = '10.07.2023';

    expect(pipe.transform(date)).toBe(convertedDate);
  });
});
