import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { ServiceResponse } from '../Models/ServiceResponse';
import { Observable } from 'rxjs';
interface RegisterBooking {
  RoomId:number;
  TotalPrice: number;
  customerName:string;
  CheckInDate: string;
  CheckOutDate: string;
  customerId: number;
  customerPhone: number;
  // ... other properties
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  API_URL = environment.apiBaseUrl + "Booking/addBooking";
  constructor(private http:HttpClient) {}

  getBookings(){
    return this.http.get<RegisterBooking[]>(this.API_URL);
  }

  addBooking(data:RegisterBooking):Observable<ServiceResponse<RegisterBooking>>{
    const formData = new FormData();

    // Append booking details as form fields
    formData.append('RoomId', data.RoomId.toString());
    formData.append('CheckInDate', data.CheckInDate);
    formData.append('CheckOutDate', data.CheckOutDate);
    formData.append('TotalPrice', data.TotalPrice.toString());
    formData.append('customerName', data.customerName.toString());
    formData.append('customerId', data.customerId.toString());
    formData.append('customerPhone', data.customerPhone.toString());
    
    const token = localStorage.getItem('jwtToken');
      
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.API_URL)
    console.log(headers)
    console.log(data)

    return this.http.post<ServiceResponse<RegisterBooking>>(this.API_URL,data, {headers});
  }

 

  deleteBooking(id:number){
    return this.http.delete(this.API_URL + `/${id}`);
  }

}
