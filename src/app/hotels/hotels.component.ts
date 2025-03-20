import { Component, OnInit } from '@angular/core';
import { Hotels } from '../Models/Hotels';  // Correctly imported Hotels model
import { HotelsService } from '../Services/hotels.service';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { MenuItem } from '../Models/MenuItem';
import { ServiceResponse } from '../Models/ServiceResponse';

interface CityOption {
  name: string;
  code: string; // Or value: string; use either code or value
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
  hotels: Hotels[] | undefined; 
  showButton: boolean = false;
  threshold: number = 50;
  cities: CityOption[] = [];
  selectedCity: string | null = null;
  filteredHotels: Hotels[] = []; 
  constructor(private hotelService: HotelsService, private route: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    // Fetch all hotels on component load
    this.hotelService.GetAll().subscribe(
      (response: ServiceResponse<Hotels[]>) => {  // Ensure the response is of type ServiceResponse<Hotels[]>
        if (response && response.success && response.data) {
          this.hotels = response.data; 
          this.populateCities(response.data);
          this.filterHotels();
          console.log(response.data) // Assign the hotel data to the hotels array
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
  populateCities(hotels: Hotels[]) {
    if (hotels && hotels.length > 0) {
      const uniqueCities = new Set<string>();
      hotels.forEach(hotel => {
        if (hotel.city && !uniqueCities.has(hotel.city)) {
          uniqueCities.add(hotel.city);
          this.cities.push({ name: hotel.city, code: hotel.city });
        }
      });
      this.filterHotels(); // Call filterHotels after populating cities
    }
  }
  // Navigate to a specific hotel page
  goToHotel(id: any) {
    this.route.navigateByUrl(`/hotel/${id}`);
  }

  // Scroll to the top of the page
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  filterHotels() {
    if (this.selectedCity) {
      this.filteredHotels = this.hotels!.filter(hotel => hotel.city === this.selectedCity);
    } else {
      this.filteredHotels = [...this.hotels!]; // Show all hotels if no city is selected
    }
  }
}
