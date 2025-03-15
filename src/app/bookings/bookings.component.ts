import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Services/booking.service';
import { Booking } from '../Models/Booking';
import { MenuItem } from '../Models/MenuItem';
import { AuthServiceService } from '../Services/auth-service.service';
import { ServiceResponse } from '../Models/ServiceResponse';
import { RegisterBooking } from '../Models/RegisterBooking';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
  bookingModel:RegisterBooking[] = [];


  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  UserId!: string | null;

  constructor(private bookingService:BookingService, private authService: AuthServiceService) {

    
  }
  ngOnInit(): void {

    this.loadBookings(); 

    this.authService.getUserId().subscribe(resp => {
      this.UserId = resp;
    });

    window.scrollTo(0, 0);



    this.items = [
      { label: 'Home' }, 
      { label: 'bookings' }
   
  ];
  this.items = [ { label: 'Home' , route: '/home' },{ label: 'booking' }];
  }


loadBookings(){
  this.bookingService.getUserBookings().subscribe((response:ServiceResponse<RegisterBooking[]>)=> {
    if(response.success){
      this.bookingModel = response.data;
      console.log(response.data)
    }else{
      alert("თქვნე ჯერ არ გაქვთ ჯავშნები")
    }
  })
}

 deleteBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe((response: ServiceResponse<boolean>) => {
      if (response.success) {
        alert('Booking deleted successfully.');
        this.loadBookings(); 
      } else {
        alert('Failed to delete booking.');
        this.loadBookings(); 
      }
    });
  }
}
