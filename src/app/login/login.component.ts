import { Component } from '@angular/core';
import { MenuItem } from '../Models/MenuItem';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  items: MenuItem[] | undefined;

    constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private rout: Router,
    ) {

      this.items = [{ label: 'Home' }, { label: 'Login' }];

      this.items = [
        { label: 'Home', route: '/home' },
        { label: 'Login', route: '/login' }
      ];

    }


    ngOnInit() {
   };



}
