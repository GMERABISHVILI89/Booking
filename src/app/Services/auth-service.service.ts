import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { RegistrationModel } from '../Models/Registration';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  API_URL = environment.apiBaseUrl + "Auth"; // Adjust base URL if needed
  


  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  
  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) {this.checkTokenOnLoad();}

  register(data: RegistrationModel) {
    return this.http.post(this.API_URL + '/Register', data);
  }
  
  login(data: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/Login', data).pipe(
      tap((response) => {
        console.log("Login Response:", response); // Debugging
        if (response && response.data) { // Use response.data instead of accessToken
          this.storeAccessToken(response.data);
        } else {
          console.error("No accessToken in response");
        }
      })
    );
  }
  getProfile(): Observable<any> {
    const token = localStorage.getItem('jwtToken'); // Get stored token
    if (!token) {
      console.error('No token found');
      return new Observable(); // Return an empty observable if no token
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.API_URL}/Profile`, { headers });
  }
  private checkTokenOnLoad(): void {
    const token = localStorage.getItem('jwtToken');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
        this.isAuthenticatedSubject.next(true); // Token is valid
    }
}
  logout(): void {
    localStorage.removeItem('jwtToken'); // Clear token
    this.isAuthenticatedSubject.next(false); // Update status
}


  private storeAccessToken(token: string) {
    localStorage.setItem('jwtToken', token);
    this.isAuthenticatedSubject.next(true); // Store access token in local storage
  }

  // private storeRefreshToken(token: string) {

  // }

  getUserRole(): Observable<string | null> {
    const token = localStorage.getItem('jwtToken'); // Get token from local storage

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken.role;
      console.log(decodedToken.role)
      return of(role); // Return role as an Observable
    }

    return of(null); // Return null if no role found
  }

  getUserId(): Observable<string | null> {
    const token = localStorage.getItem('jwtToken'); // Get token from local storage

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const id = decodedToken.nameid;
      console.log(decodedToken.nameid)
      return of(id); // Return role as an Observable
    }

    return of(null); // Return null if no role found
  }
}
