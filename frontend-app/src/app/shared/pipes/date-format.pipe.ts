import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from '../../services/time.service';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  constructor(private readonly timeService: TimeService) {}

  transform(date: string, format: string): string {
    return this.timeService.convertDateFormat(date, format);
  }
}
