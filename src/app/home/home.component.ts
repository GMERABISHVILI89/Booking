import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../Services/hotels.service';
import { Hotels } from '../Models/Hotels';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  hotels: Hotels[] | undefined;
  showButton: boolean = false;
  threshold: number = 50;
  constructor(private hotelService: HotelsService, private route: Router) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.hotelService.GetAll().subscribe((hotel) => {
      this.hotels = hotel;
     
    });

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

  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  navigateToFilter() {
    this.route.navigate(['/', 'rooms']);
  }
  navigateToHotel(id: any) {
    this.route.navigateByUrl(`/hotel/${id}`);
  }
}
