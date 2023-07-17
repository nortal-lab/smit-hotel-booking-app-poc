import { AvailableRoomsComponent } from './available-rooms.component';
import { BedType, RoomData, RoomType } from '../../../models/room.interface';

describe('AvailableRoomsComponent', () => {
  const roomMock = {
    room: {
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
  } as RoomData;
  let component: AvailableRoomsComponent;
  beforeEach(() => {
    component = new AvailableRoomsComponent();
  });

  it('should trigger click action', () => {
    const clickSpy = jest.spyOn(component.onClick, 'emit');

    component.click(roomMock);

    expect(clickSpy).toHaveBeenCalledWith(roomMock);
  });
});
