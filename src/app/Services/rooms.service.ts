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

  getRooms() {
    return this.http.get<Rooms[]>(this.API_URL + `/GetAll`)
  }



  GetRoom(id: number) {
    return this.http.get<Rooms>(this.API_URL + `/GetRoom/${id}`);
  }

  getAvailableRooms(from:any,to:any){
    let params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<Rooms>(`${this.API_URL}/GetAvailableRooms`, { params });
  }
 
  GetRoomTypes(){
    return this.http.get<Rooms>(`${this.API_URL}/GetRoomTypes`);
  }

  getFiltered(data:Filter){
    return this.http.post<Rooms[]>(this.API_URL + `/getFiltered/`,data);
  }


  // AddRoom(room: CreateRoomDTO, images:File[]): Observable<ServiceResponse<Rooms>> {
  //   const formData = new FormData();

  //   // Append the room data to the form data
  //   formData.append('hotelId', room.hotelId!.toString());
  //   formData.append('name', room.name!);
  //   formData.append('pricePerNight', room.pricePerNight!.toString());
  //   formData.append('maximumGuests', room.maximumGuests!.toString());
  //   formData.append('roomTypeId', room.roomTypeId!.toString());

  //   // Append the room images if any
  //   if (images && images.length > 0) {
  //     for (let i = 0; i < images.length; i++) {
  //       formData.append('roomImages', images[i], images[i].name);
  //     }
  //   }

  //   // Send the POST request with form data (room data and images)
  //   return this.http.post<ServiceResponse<Rooms>>(`${this.API_URL}/add-room`, formData);
  // }
addRoom(roomData: FormData): Observable<ServiceResponse<Rooms>> {
  return this.http.post<ServiceResponse<Rooms>>(`${this.API_URL}/add-room`, roomData);
}

 
}
