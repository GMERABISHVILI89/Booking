import { Component, OnInit } from '@angular/core';
import { GuestQuantity, RoomType } from '../Models/RoomType';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Filter } from '../Models/Filter';
import { RoomsService } from '../Services/rooms.service';
import { Rooms } from '../Models/Rooms';
import { debounceTime, fromEvent, map } from 'rxjs';
import { MenuItem } from '../Models/MenuItem';
import { Hotels } from '../Models/Hotels';
import { HotelsService } from '../Services/hotels.service';
import { ServiceResponse } from '../Models/ServiceResponse';
import { FilterService } from '../Services/filter.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  roomForm!: FormGroup;
  rooms?: Rooms[];
  filterType?:string = "Default";
  guestQuantity?: GuestQuantity[] | undefined;
  filterData?: any = {};
  rangeValues: number[] = [20, 80];
  types?: RoomType[];
  selectedType?: number;
  dateFrom?: Date | undefined;
  dateTo?: Date | undefined;
  filteredRooms?: any[] = [];
  showButton: boolean = false;
  threshold: number = 50;
  currentIndex: number = 0;
  hotels: Hotels[] | undefined;
  hotelImages: any[] = [];
  constructor(
    private fb: FormBuilder,
    private roomService: RoomsService,
    private hotelService: HotelsService,
    private filterService:FilterService
  ) {
    this.types = [
      { id: 1, name: 'Single Room' },
      { id: 2, name: 'Double Room' },
      { id: 3, name: 'Deluxe Room' },
    ];
    this.guestQuantity = [
      { val: 1 },
      { val: 2 },
      { val: 3 },
      { val: 4 },
      { val: 5 },
      { val: 6 },
    ];
  }

  ngOnInit() {

    this.roomForm = this.fb.group({
      roomTypeId: [0], // Defaulting to 0
      priceFrom: [0],
      priceTo: [0],
      maximumGuests: [0],
      checkIn: [null],
      checkOut: [null]
    });



    this.hotelService.GetAll().subscribe(
       (response: ServiceResponse<Hotels[]>) => {  // Ensure the response is of type ServiceResponse<Hotels[]>
         if (response && response.success && response.data) {
           this.hotels = response.data; 
           console.log(response.data)
           this.hotelImages = response.data // Assign the hotel data to the hotels array
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

     this.roomService.GetAll().subscribe((response) => {
      if (response.success) {  
        this.rooms = response.data; 
        this.filteredRooms = [...this.rooms]
         console.log(this.filteredRooms)
    
      } else {
        console.error('Error fetching rooms:', response.message);  
      }
    });
    this.items = [{ label: 'Home' }, { label: 'rooms' }];

    this.items = [{ label: 'Home', route: '/home' }, { label: 'rooms' }];

    this.roomForm = this.fb.group({
      roomTypeId: [null, Validators.required],
      priceFrom: [50, [Validators.required, Validators.min(0)]],
      priceTo: [500, [Validators.required, Validators.min(0)]],
      priceRange: [[50, 500], Validators.required],
      maximumGuests: [null, [Validators.required, Validators.min(1)]],
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
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

  onPriceRangeChange(event: any) {
    const values = event.values;
    this.roomForm.patchValue({
      priceFrom: values[0],
      priceTo: values[1],
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      this.filterData = {
        roomTypeId: this.roomForm.value.roomTypeId || 0,
        priceFrom: this.roomForm.value.priceFrom || 0,
        priceTo: this.roomForm.value.priceTo || 0,
        maximumGuests: this.roomForm.value.maximumGuests || 0,
        checkIn: this.roomForm.value.checkIn ? new Date(this.roomForm.value.checkIn).toISOString() : null,
        checkOut: this.roomForm.value.checkOut ? new Date(this.roomForm.value.checkOut).toISOString() : null,
      };
      console.log(this.roomForm)
      // this.rooms?.push(<Rooms>data)
      this.filterService.getFiltered(this.filterData).subscribe((response: ServiceResponse<any[]>) => {
        this.rooms = response.data;
        console.log(response.data);
        this.filterType = "Filtered";
        this.filteredRooms = response.data;
      });
    } else {
      alert('გთხოვთ შეავსოთ ფილტრი !');
    }
  }

  filterRooms(param: number) {
    if (param != 0) {
      this.filteredRooms = [];
      this.rooms?.map((el) => {
        if (el.roomTypeId == param) {
          this.filteredRooms?.push(el);
          this.filterType = "Default";
        }
      });
    } else {
      this.filteredRooms = [...this.rooms!];
    }
  }
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.hotelImages.length - 1;
    }
  }
  nextImage() {
    if (this.currentIndex < this.hotelImages.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  filterHotelRooms(id: any) {
    this.roomService.GetRoomsByHotelId(Number(id)).subscribe((response) => {

      if(response.success){
        console.log(response.data)
        this.filteredRooms = [...response.data];
        this.filterType = "Default";
      }
     
    });
  }
}
