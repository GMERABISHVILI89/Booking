import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Services/booking.service';
import { Booking } from '../Models/Booking';
import { MenuItem } from '../Models/MenuItem';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
  bookingModel:Booking[] = [];


  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  constructor(private bookingService:BookingService) {

    
  }
  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(data => {
      this.bookingModel = data;
      console.log(this.bookingModel)
    })

    this.items = [
      { label: 'Home' }, 
      { label: 'bookings' }
   
  ];

  this.items = [ { label: 'Home' , route: '/home' },{ label: 'booking' }];
  }

  deleteBooking(id:number){
    this.bookingService.deleteBooking(id).subscribe(data => {
     alert('ჯავშანი წარმატებით წაიშალა')
    })
  }

}
