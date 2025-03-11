import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { Hotels } from '../Models/Hotels';
import { Rooms } from '../Models/Rooms';
import { Observable } from 'rxjs';
interface Hotel {
  id: number;
  name: string;
  city: string;
  address: string;
  hotelimage: string;  
}
interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  API_URL = environment.apiBaseUrl + "Hotels";


  constructor(private http: HttpClient) {}

 // Fetch all hotels
 GetAll(): Observable<ServiceResponse<Hotel[]>> {
  return this.http.get<ServiceResponse<Hotel[]>>(this.API_URL + `/all`);
}
  // Fetch a single hotel by ID
  GetHotel(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + `/${id}`);
  }




  // Add a new hotel
  AddHotel(hotel: any, hotelImage: File): Observable<ServiceResponse<Hotel>> {
    const formData = new FormData();
  
    // Append hotel details as form fields
    formData.append('name', hotel.name);
    formData.append('city', hotel.city);
    formData.append('address', hotel.address);
  
    // Append the image file
    if (hotelImage) {
      formData.append('hotelImage', hotelImage);
    }
  
    // Get the JWT token from localStorage (assuming you stored it there during login)
    const token = localStorage.getItem('jwtToken');
    
    // Set the Authorization header if the token exists
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Send the request with the Authorization header
    return this.http.post<ServiceResponse<Hotel>>(`${this.API_URL}/AddHotel`, formData, { headers });
  }
}
