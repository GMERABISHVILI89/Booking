export class CreateRoomDTO {
    hotelId?: number;           // ID of the hotel the room belongs to
    name?: string;              // Name of the room
    pricePerNight?: number;     // Price per night for the room
    maximumGuests?: number;     // Maximum number of guests that can stay in the room
    roomTypeId?: number;       // Type of the room (e.g., standard, deluxe)
    roomImages?: File[];
  }