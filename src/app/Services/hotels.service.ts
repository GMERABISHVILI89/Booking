import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { Hotels } from '../Models/Hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  API_URL = environment.apiBaseUrl + "Hotels";
  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Hotels[]>(this.API_URL + `/GetAll`);
  }

  GetHotel(id: number) {
    return this.http.get<Hotels>(this.API_URL + `GetHotel/${id}`);
  }

  GetHotels(city:string) {
    let params = new HttpParams().set('city', city);
    return this.http.get(`${this.API_URL}/GetHotels`, { params });
  }

  GetCities() {
    return this.http.get<Hotels[]>(this.API_URL + `GetCities`);
  }
}
