export interface RoomDTO {
  airConditioning: boolean;
  balcony: boolean;
  bathrobeAndSlippers: boolean;
  bedsType: BedType;
  freeBottledWater: boolean;
  freeWiFi: boolean;
  inRoomSafe: boolean;
  ironAndIroningBoard: boolean;
  peopleCapacity: number;
  pricePerNight: number;
  professionalHairDryer: boolean;
  rainShower: true;
  roomId: string;
  roomNumber: number;
  roomSizeInSquareMeters: number;
  roomType: RoomType;
  smartTV: boolean;
}

export interface Room {
  airConditioning: boolean;
  balcony: boolean;
  bathrobeAndSlippers: boolean;
  bedsType: BedType;
  freeBottledWater: boolean;
  freeWiFi: boolean;
  inRoomSafe: boolean;
  ironAndIroningBoard: boolean;
  peopleCapacity: number;
  pricePerNight: string;
  professionalHairDryer: boolean;
  rainShower: boolean;
  roomId: string;
  roomNumber: number;
  roomSizeInSquareMeters: number;
  roomType: RoomType;
  smartTV: boolean;
}

export enum RoomType {
  DELUXE = 'Deluxe',
  FAMILY = 'Family',
  SINGLE = 'Single',
  STANDARD_DOUBLE = 'StandardDouble',
  STANDARD_TWIN = 'StandardTwin',
  STUDIO = 'Studio',
}

export enum BedType {
  ONE_DOUBLE = 'OneDouble',
  ONA_KING_AND_ONE_SOFA = 'OneKingAndOneSofa',
  ONE_TWIN = 'OneTwin',
  TWO_TWIN = 'TwoTwin',
}
