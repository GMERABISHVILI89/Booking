import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../Models/Booking';
import { environment } from '../Models/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  API_URL = environment.apiBaseUrl + "Booking";
  constructor(private http:HttpClient) {}

  getBookings(){
    return this.http.get<Booking[]>(this.API_URL);
  }

  addBooking(data:Booking){
    return this.http.post(this.API_URL,data);
  }

  deleteBooking(id:number){
    return this.http.delete(this.API_URL + `/${id}`);
  }

}
