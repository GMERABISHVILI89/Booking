import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../Services/language.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  navbar: any;
  isAuthenticated: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(private translate: LanguageService,private router: Router,private authService: AuthServiceService) {}
  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated.subscribe(
      (status) => {
          this.isAuthenticated = status;
      }
  );

    this.translate.getCurrentLanguage();
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
        this.authSubscription.unsubscribe();
    }
}
  showSideBar() {
    this.navbar = document.querySelector('.nav-bar');
    this.navbar.classList.toggle('active');
    this.navbar.addEventListener('click',()=>{
      this.navbar.classList.remove('active');
    })
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
}
  goToHomePage() {
    this.router.navigate(['/', '*']);
  }
  goToProfilePage(){
    this.router.navigate(['/Profile']);
  }
  changeLang(param: any) {
    this.translate.changeLanguage(this.translate.languages[param]);
  }
}
