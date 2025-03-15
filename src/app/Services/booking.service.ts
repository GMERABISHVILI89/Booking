import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { ServiceResponse } from '../Models/ServiceResponse';
import { Observable } from 'rxjs';
import { RegisterBooking } from '../Models/RegisterBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  API_URL = environment.apiBaseUrl + "Booking/addBooking";
  API_URL_GET_BOOKINGS = environment.apiBaseUrl + "Booking/";
  constructor(private http:HttpClient) {}

  getUserBookings():Observable<ServiceResponse<RegisterBooking[]>> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ServiceResponse<RegisterBooking[]>>(this.API_URL_GET_BOOKINGS, { headers });
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
    return this.http.post<ServiceResponse<RegisterBooking>>(this.API_URL,data, {headers});
  }

 

  deleteBooking(bookingId: number) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<ServiceResponse<boolean>>(`${this.API_URL_GET_BOOKINGS}${bookingId}`, { headers });
  }

}
