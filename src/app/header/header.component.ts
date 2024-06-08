import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../Services/language.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{


  navbar:any;
  constructor(private translate:LanguageService) {
   
  }
  ngOnInit(): void {
    this.translate.getCurrentLanguage();
 
  }
  showSideBar(){
    this.navbar = document.querySelector('.nav-bar');
    this.navbar.classList.toggle("active");

  }

  goToHomePage(){
    window.location.href ="/"
  }

  changeLang(param:any){
this.translate.changeLanguage(this.translate.languages[param]);
console.log(this.translate.selectedLanguage);
  }
}
