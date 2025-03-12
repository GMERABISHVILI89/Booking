import { Component } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { UserProfile } from '../Models/UserProfie';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  isAdmin: boolean = false; // Track if user is an Admin
  userProfile!:UserProfile | undefined;

constructor(private auth : AuthServiceService, private jwtHelper: JwtHelperService, private router: Router) {
  this.auth.getProfile().subscribe(profile => {
    this.userProfile = profile.data;
    console.log("User Profile:", this.userProfile);


  });

  this.checkUserRole();
}


checkUserRole(): void {
  const token = localStorage.getItem('jwtToken'); 
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
   
    this.isAdmin = decodedToken.role === 'Admin'; // Check if user role is Admin
  }
}

navigateToAdmin(): void {
  this.router.navigate(['/admin']); // Navigate to Admin page
}

}
