import { Component,  OnInit } from '@angular/core';
import { HotelsService } from '../../Services/hotels.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
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

constructor(private hotelService:HotelsService, private router:ActivatedRoute, private route:Router) {
 
}
  ngOnInit(): void {
    
    this.hotelId = this.router.snapshot.paramMap.get('id');
    this.hotelService.GetHotel(Number(this.hotelId)).subscribe((hotel:any) => {
      this.hotel = hotel; 
      this.rooms = hotel.rooms;
     
      this.rooms.forEach((room: any) => {
        if (room.images) {
          this.roomImages = this.roomImages.concat(room.images);
        }
      });
      // Log the arrays to the console
      console.log('Room Images:', this.rooms);
    })
   

  }

  goToRoom(id:any){
    this.route.navigateByUrl(`/room/${id}`)
  }
}
