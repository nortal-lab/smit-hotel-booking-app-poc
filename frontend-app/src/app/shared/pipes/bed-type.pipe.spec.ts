import { BedTypePipe } from './bed-type.pipe';
import { BedType } from '../../models/room.interface';

describe('BedTypePipe', () => {
  let pipe: BedTypePipe;

  beforeEach(() => {
    pipe = new BedTypePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "1 king and 1 sofa" when input is "OneKingAndOneSofa"', () => {
    expect(pipe.transform(BedType.ONA_KING_AND_ONE_SOFA)).toBe('1 king and 1 sofa');
  });

  it('should return "1 double" when input is "OneDouble"', () => {
    expect(pipe.transform(BedType.ONE_DOUBLE)).toBe('1 double');
  });

  it('should return "1 twin" when input is "OneTwin"', () => {
    expect(pipe.transform(BedType.ONE_TWIN)).toBe('1 twin');
  });

  it('should return "2 twin" when input is "TwoTwin"', () => {
    expect(pipe.transform(BedType.TWO_TWIN)).toBe('2 twin');
  });
});
