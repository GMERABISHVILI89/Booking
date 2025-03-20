
export class Rooms {

    id?: number;
    name?: string;
    hotelId?: number;
    pricePerNight?: number;
    available?: boolean;
    maximumGuests?: number;
    roomTypeId?: number;
    bookedDates?:bookDates [] = [];
    imageUrls?:Images [] = []

}

 export class bookDates{
    id?: number;
    date?: Date;
    roomId?: number;
}

export class Images{
    id?: number;
    source?: string;
    roomId?: number;
}