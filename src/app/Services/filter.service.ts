import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../Models/ServiceResponse';
interface Filter {
  roomTypeId: { id: number, name: string };
  priceFrom: number;
  priceTo: number;
  checkIn: string;
  checkOut: string;
  maximumGuests: { val: number };
}
@Injectable({
  providedIn: 'root'
})


export class FilterService {
  API_URL = environment.apiBaseUrl + "Filter";


  constructor(private http: HttpClient) {}


  getFiltered(filter: Filter): Observable<ServiceResponse<Filter[]>> {
    const modifiedFilter = {
      ...filter,
      maximumGuests: filter.maximumGuests.val,
      roomTypeId: filter.roomTypeId.id
    };

    return this.http.post<ServiceResponse<Filter[]>>(`${this.API_URL}/filter`, modifiedFilter);
  }


}
