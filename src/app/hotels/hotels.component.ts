import { Component, OnInit } from '@angular/core';
import { Hotels } from '../Models/Hotels';
import { HotelsService } from '../Services/hotels.service';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { MenuItem } from '../Models/MenuItem';
interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
interface Hotel {
  // Define the Hotel interface to match your ASP.NET Core Hotel class
  id: number;
  name: string;
  city: string;
  address:string;
  FeaturedImage:string;
}
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css',
})
export class HotelsComponent implements OnInit {
  commentImages: string[] = [
    '../../../assets/Images/random4.JPG',
    '../../../assets/Images/random2.JPG',
    '../../../assets/Images/random3.JPG',
    '../../../assets/Images/random5.JPG',
    '../../../assets/Images/random6.JPG',
  ];
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  hotels: Hotels[] | undefined;
  showButton: boolean = false;
  threshold: number = 50;
  constructor(private hotelService: HotelsService, private route: Router) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.hotelService.GetAll().subscribe((response: ServiceResponse<Hotel[]>) => {
      if (response && response.data) {
        this.hotels = response.data;
      } else {
        console.error('Failed to retrieve hotels:', response);
        // Handle the error (e.g., display an error message)
      }
    });
    this.items = [{ label: 'Home' }, { label: 'Hotels' }];

    this.items = [
      { label: 'Home', route: '/home' },
      { label: 'Hotels', route: '/hotels' },
    ];
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

  goToHotel(id: any) {
    this.route.navigateByUrl(`/hotel/${id}`);
  }
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
