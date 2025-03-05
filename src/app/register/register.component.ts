import { Component } from '@angular/core';
import { MenuItem } from '../Models/MenuItem';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from '../Models/Registration';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
items: MenuItem[] | undefined;
registrationForm!: FormGroup;
    constructor(private http: HttpClient,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private authService:AuthServiceService
    ) {

      this.registrationForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required], // Add repeatPassword control
        role: ['user']
      });

      this.items = [{ label: 'Home' }, { label: 'Register' }];

      this.items = [
        { label: 'Home', route: '/home' },
        { label: 'Register', route: '/register' }
      ];

    }
    onSubmit() {
      if (this.registrationForm.valid) {
        const registrationData: RegistrationModel = this.registrationForm.value;
        this.authService.register(registrationData)
          .subscribe({
            next: response => {
              console.log('Registration successful:', response);
              this.router.navigate(['/login']); // Use injected Router
            },
            error: error => {
              console.error('Registration failed:', error);
              // Consider displaying an error message to the user here
              // this.router.navigate(['/home']); // Use injected Router if needed
            }
          });
      }
    }

    ngOnInit() {
   };
}
