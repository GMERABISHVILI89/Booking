import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../Services/hotels.service';
import { Hotels } from '../Models/Hotels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  hotels:Hotels[] | undefined;

  constructor(private hotelService: HotelsService,private router: Router) {}
  ngOnInit(): void {
    this.hotelService.GetAll().subscribe((hotel) => {
      this.hotels = hotel;
      console.log(this.hotels)
    })
  }
  navigateToFilter(){
    this.router.navigate(['/', 'rooms']);
  }

}
