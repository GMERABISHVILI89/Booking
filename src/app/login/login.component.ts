import { Component } from '@angular/core';
import { MenuItem } from '../Models/MenuItem';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  items: MenuItem[] | undefined;
  loginForm!: FormGroup;
  errorMessage: string = '';
    constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private authService:AuthServiceService
    ) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        rememberMe: [false]
      });


      // navigatin
      this.items = [{ label: 'Home' }, { label: 'Login' }];
      this.items = [
        { label: 'Home', route: '/home' },
        { label: 'Login', route: '/login' }
      ];

    }

    onSubmit() {
      this.errorMessage = ''; // Clear previous error messages
  
      if (this.loginForm.valid) {
        const loginData = this.loginForm.value;
        this.authService.login(loginData)
          .subscribe({
            next: response => {
              console.log('Login successful:', response);
              this.router.navigate(['/home']); // Redirect to home or another page
            },
            error: error => {
              console.error('Login failed:', error);
  
              if (error && error.error && error.error.message) {
                this.errorMessage = error.error.message; // Display API error message
              } else {
                this.errorMessage = 'Login failed. Please check your credentials.';
              }
            }
          });
      } else {
        this.errorMessage = 'Please fill out all required fields.'; // Display form error
      }
    }


    ngOnInit() {
   };



}
