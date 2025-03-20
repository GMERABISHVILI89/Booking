import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../Services/hotels.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Rooms } from '../../Models/Rooms';
import { debounceTime, fromEvent, map } from 'rxjs';
import { MenuItem } from '../../Models/MenuItem';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css',
})
export class HotelComponent implements OnInit {
  hotelId: any;
  hotel: any;
  rooms:any [] = [];
  roomDetails: any[] = [];
  roomImages: any[] = [];
  available: any;
  showButton: boolean = false;
  threshold: number = 300;
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  constructor(
    private hotelService: HotelsService,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.items = [{ label: 'Home' }, { label: 'Hotels' }, { label: 'Hotel' }];

    this.items = [
      { label: 'Home', route: '/home' },
      { label: 'Hotels', route: '/hotels' },
      { label: 'hotel' },
    ];

    window.scrollTo(0, 0);
    this.hotelId = this.router.snapshot.paramMap.get('id');
    this.hotelService.GetHotel(Number(this.hotelId)).subscribe((hotel: any) => {
      this.hotel = hotel.data;
      console.log(hotel)
      this.rooms = hotel.data.rooms;
      this.rooms.forEach((room: any) => {
        if (room.images) {
          this.roomImages = this.roomImages.concat(room.images);
        }
      });
    });
    const scroll$ = fromEvent(window, 'scroll').pipe(
      debounceTime(100),
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
  goToRoom(id: any) {
    this.route.navigateByUrl(`/room/${id}`);
  }
}
