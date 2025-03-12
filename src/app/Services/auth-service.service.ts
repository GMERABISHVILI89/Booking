import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Models/Enviroment';
import { RegistrationModel } from '../Models/Registration';
import { Observable, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  API_URL = environment.apiBaseUrl + "Auth"; // Adjust base URL if needed
  
  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) {}

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

  private storeAccessToken(token: string) {
    localStorage.setItem('jwtToken', token); // Store access token in local storage
  }

  // private storeRefreshToken(token: string) {
  //   // Store refresh token securely (e.g., in HttpOnly cookies)
  //   // ... implementation for secure storage ...
  // }

  getUserRole(): Observable<string | null> {
    const token = localStorage.getItem('jwtToken'); // Get token from local storage

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Adjust claim name if needed
      return of(role); // Return role as an Observable
    }

    return of(null); // Return null if no role found
  }
}
