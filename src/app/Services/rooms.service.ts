import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rooms } from '../Models/Rooms';
import { Filter } from '../Models/Filter';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  API_URL = environment.apiBaseUrl + "Rooms";
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
  
  addRoom(formData: FormData) {
    return this.http.post(`${this.API_URL}/AddRoom`, formData);
  }

}
