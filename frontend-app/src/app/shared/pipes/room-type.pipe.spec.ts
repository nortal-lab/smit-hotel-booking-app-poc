import { RoomTypePipe } from './room-type.pipe';
import { RoomType } from '../../models/room.interface';

describe('RoomTypePipe', () => {
  let pipe: RoomTypePipe;

  beforeEach(() => {
    pipe = new RoomTypePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Deluxe" when input is "Deluxe"', () => {
    expect(pipe.transform(RoomType.DELUXE)).toBe('Deluxe');
  });

  it('should return "Family" when input is "Family"', () => {
    expect(pipe.transform(RoomType.FAMILY)).toBe('Family');
  });

  it('should return "Single" when input is "Single"', () => {
    expect(pipe.transform(RoomType.SINGLE)).toBe('Single');
  });

  it('should return "Studio" when input is "Studio"', () => {
    expect(pipe.transform(RoomType.STUDIO)).toBe('Studio');
  });

  it('should return "Standard double" when input is "StandardDouble"', () => {
    expect(pipe.transform(RoomType.STANDARD_DOUBLE)).toBe('Standard double');
  });

  it('should return "Standard twin" when input is "StandardTwin"', () => {
    expect(pipe.transform(RoomType.STANDARD_TWIN)).toBe('Standard twin');
  });
});
