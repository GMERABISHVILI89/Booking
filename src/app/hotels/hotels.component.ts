import { Component, OnInit } from '@angular/core';
import { Hotels } from '../Models/Hotels';  // Correctly imported Hotels model
import { HotelsService } from '../Services/hotels.service';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { MenuItem } from '../Models/MenuItem';

interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
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
  hotels: Hotels[] | undefined; // Use the Hotels[] type from your Models
  showButton: boolean = false;
  threshold: number = 50;

  constructor(private hotelService: HotelsService, private route: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    // Fetch all hotels on component load
    this.hotelService.GetAll().subscribe(
      (response: ServiceResponse<Hotels[]>) => {  // Ensure the response is of type ServiceResponse<Hotels[]>
        if (response && response.success && response.data) {
          this.hotels = response.data;  // Assign the hotel data to the hotels array
        } else {
          console.error('Failed to retrieve hotels:', response.message);
          // Optionally handle the failure, e.g., display a message to the user
        }
      },
      (error) => {
        console.error('Error fetching hotels:', error);
        // Handle error, e.g., display an error message
      }
    );

    // Menu item setup
    this.items = [
      { label: 'Home', route: '/home' },
      { label: 'Hotels', route: '/hotels' },
    ];

    // Scroll logic for the button visibility
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

  // Navigate to a specific hotel page
  goToHotel(id: any) {
    this.route.navigateByUrl(`/hotel/${id}`);
  }

  // Scroll to the top of the page
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
