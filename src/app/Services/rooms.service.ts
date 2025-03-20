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


addRoom(roomData: FormData): Observable<ServiceResponse<Rooms>> {
  return this.http.post<ServiceResponse<Rooms>>(`${this.API_URL}/add-room`, roomData);
}

 
}
