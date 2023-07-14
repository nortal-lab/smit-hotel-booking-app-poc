export interface AvailableRoomsDTO {
  startDate: string;
  endDate: string;
  availableRooms: RoomDTO[];
}

export interface AvailableRooms {
  startDate: string;
  endDate: string;
  availableRooms: Room[];
}

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
  professionalHairDryer: boolean;
  rainShower: true;
  roomId: string;
  roomNumber: number;
  roomSizeInSquareMeters: number;
  roomType: RoomType;
  smartTV: boolean;
  estimatedTaxes: number;
  priceBeforeTaxes: number;
  pricePerNightIncludingTaxes: number;
  customerFirstName?: string;
  customerLastName?: string;
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
  professionalHairDryer: boolean;
  rainShower: boolean;
  roomId: string;
  roomNumber: number;
  roomSizeInSquareMeters: number;
  roomType: RoomType;
  smartTV: boolean;
  estimatedTaxes: number;
  priceBeforeTaxes: number;
  pricePerNightIncludingTaxes: string;
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
