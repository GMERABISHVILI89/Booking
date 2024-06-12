import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Rooms } from '../Models/Rooms';
import { Filter } from '../Models/Filter';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  API_URL = environment.apiBaseUrl + "Rooms";
  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get<Rooms[]>(this.API_URL + `/GetAll`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  };


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

}
