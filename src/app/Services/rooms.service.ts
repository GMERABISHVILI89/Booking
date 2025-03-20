import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rooms } from '../Models/Rooms';
import { Filter } from '../Models/Filter';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../Models/ServiceResponse';
import { CreateRoomDTO } from '../Models/CreateRoomDTO';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  API_URL = environment.apiBaseUrl + "Room";
  
  
  constructor(private http: HttpClient) { }

 
 
 
 
  GetAll(): Observable<ServiceResponse<Rooms[]>> {
  return this.http.get<ServiceResponse<Rooms[]>>(this.API_URL + `/all`);
}


GetRoomsByHotelId(id: number):  Observable<ServiceResponse<Rooms[]>> {
  return this.http.get<ServiceResponse<Rooms[]>>(this.API_URL + `/RoomsByHotelId/${id}`);
}

  GetRoom(id: number): Observable<ServiceResponse<Rooms>> {
    return this.http.get<ServiceResponse<Rooms>>(this.API_URL + `/${id}`);
  }

  getAvailableRooms(from:any,to:any){
    let params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<Rooms>(`${this.API_URL}/GetAvailableRooms`, { params });
  }
 
  GetRoomTypes(){
    return this.http.get<Rooms>(`${this.API_URL}/GetRoomTypes`);
  }


  addRoom(roomData: any, selectedImages: File[]): Observable<ServiceResponse<Rooms>> {
    const formData = new FormData();
  
    // Append basic room details
    formData.append('hotelId', String(roomData.hotelId));
    formData.append('name', String(roomData.name));
    formData.append('pricePerNight', String(roomData.pricePerNight));
    formData.append('maximumGuests', String(roomData.maximumGuests));
    formData.append('roomTypeId', String(roomData.roomTypeId));
  
    // Append room images
    selectedImages.forEach((image, index) => {
      formData.append(`roomImages`, image, image.name); // roomImages[] will be processed as a list
    });
  
    // Debugging: Log FormData
  
  
    // Make API request
    return this.http.post<ServiceResponse<Rooms>>(`${this.API_URL}/add-room`, formData);
  }

 
}
