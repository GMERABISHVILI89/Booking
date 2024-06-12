import { Component, OnInit } from '@angular/core';
import { Hotels } from '../Models/Hotels';
import { HotelsService } from '../Services/hotels.service';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { MenuItem } from '../Models/MenuItem';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent implements OnInit{
  commentImages: string[] = [
    '../../../assets/Images/random4.JPG',
    '../../../assets/Images/random2.JPG',
    '../../../assets/Images/random3.JPG',
    '../../../assets/Images/random5.JPG',
    '../../../assets/Images/random6.JPG'
  ];
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  hotels:Hotels[] | undefined;
  showButton: boolean = false;
  threshold: number = 50;
  constructor(private hotelService: HotelsService, private route:Router) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.hotelService.GetAll().subscribe((hotel) => {
      this.hotels = hotel;
    
    })
    this.items = [
      { label: 'Home' }, 
      { label: 'Hotels' }
  ];

  this.items = [ { label: 'Home' , route: '/home' },{ label: 'Hotels' , route: '/hotels' }];
    const scroll$ = fromEvent(window, 'scroll').pipe(
      debounceTime(50), 
      map(() => {
        try {
          return window.scrollY > this.threshold; 
        } catch (error) {
          console.error('Error obtaining scroll position:', error);
          return false; 
        }
      })
    );
    scroll$.subscribe((isScrolled) => (this.showButton = isScrolled));
  }

  goToHotel(id:any){
    this.route.navigateByUrl(`/hotel/${id}`)
  }
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

}
