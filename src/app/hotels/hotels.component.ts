import { Component, OnInit } from '@angular/core';
import { Hotels } from '../Models/Hotels';
import { HotelsService } from '../Services/hotels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent implements OnInit{

  hotels:Hotels[] | undefined;

  constructor(private hotelService: HotelsService, private route:Router) {}
  ngOnInit(): void {
    this.hotelService.GetAll().subscribe((hotel) => {
      this.hotels = hotel;
      console.log(this.hotels)
    })
  }

  goToHotel(id:any){
    this.route.navigateByUrl(`/hotel/${id}`)
  }

}
