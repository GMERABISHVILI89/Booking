import { Component,  OnInit } from '@angular/core';
import { HotelsService } from '../../Services/hotels.service';
import { ActivatedRoute } from '@angular/router';
import { Rooms } from '../../Models/Rooms';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent implements OnInit {

 hotelId:any;
 hotel:any;
 rooms:Rooms[]=[];
 roomDetails:any[]=[];
 roomImages:any[]=[];
 available:any;

constructor(private hotelService:HotelsService, private route:ActivatedRoute) {
 
}
  ngOnInit(): void {
    
    this.hotelId = this.route.snapshot.paramMap.get('id');
    this.hotelService.GetHotel(Number(this.hotelId)).subscribe((hotel:any) => {
      this.hotel = hotel; 
      this.rooms = hotel.rooms;
     
      this.rooms.forEach((room: any) => {
        if (room.images) {
          this.roomImages = this.roomImages.concat(room.images);
        }
      });
      // Log the arrays to the console
      console.log('Room Images:', this.roomImages);
    })
   

  }
}
