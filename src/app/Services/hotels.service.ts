import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { Hotels } from '../Models/Hotels';
import { Rooms } from '../Models/Rooms';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../Models/ServiceResponse';
interface Hotel {
  id: number;
  name: string;
  city: string;
  address: string;
  hotelimage: string;  
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



  // admin 


  // Method to get hotel details by ID
  getHotelById(hotelId: number): Observable<ServiceResponse<Hotel>> {
    return this.http.get<ServiceResponse<Hotel>>(this.API_URL + `/${hotelId}`);
  }

  updateHotel(hotelId: number, hotelData: any): Observable<ServiceResponse<Hotel>> {
    // Create a FormData instance
    const formData = new FormData();

    // Append hotel data to formData
    formData.append('name', hotelData.name);
    formData.append('address', hotelData.address);
    formData.append('city', hotelData.city);

    // Check if hotel image exists and append it if present
  // Only append hotelImage if it exists and is not an empty string.
  if (hotelData.hotelImage && hotelData.hotelImage !== '') {
    formData.append('hotelImage', hotelData.hotelImage, hotelData.hotelImage.name);
  }
    // Get the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');

    // Check if token exists
    if (!token) {
        console.error('JWT token is missing.');
    }

    // Set the Authorization header if the token exists
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Call the API with headers and formData
    return this.http.put<ServiceResponse<Hotel>>(this.API_URL + `/update/${hotelId}`, formData, { headers }); // corrected path
}

  // Method to delete hotel
  deleteHotel(hotelId: number): Observable<ServiceResponse<Hotel>> {
    return this.http.delete<ServiceResponse<Hotel>>(`${this.API_URL}/delete/${hotelId}`);
  }
}
