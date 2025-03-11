import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Models/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  //  API_URL = environment.apiBaseUrl + "upload";

  // constructor(private http: HttpClient) {}

  // uploadHotelImage(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post(`${this.API_URL}/hotel`, formData);
  // }

  // uploadRoomImages(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post(`${this.API_URL}/room`, formData);
  // }
}
