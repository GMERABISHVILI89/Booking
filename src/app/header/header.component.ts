import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../Services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  navbar: any;
  constructor(private translate: LanguageService,private router: Router) {}
  ngOnInit(): void {
    this.translate.getCurrentLanguage();
  }
  showSideBar() {
    this.navbar = document.querySelector('.nav-bar');
    this.navbar.classList.toggle('active');
    this.navbar.addEventListener('click',()=>{
      this.navbar.classList.remove('active');
    })
  }

  goToHomePage() {
    this.router.navigate(['/', '*']);
  }

  changeLang(param: any) {
    this.translate.changeLanguage(this.translate.languages[param]);
  }
}
