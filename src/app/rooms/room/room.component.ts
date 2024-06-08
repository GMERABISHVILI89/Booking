import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RoomsService } from '../../Services/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { Rooms } from '../../Models/Rooms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  roomId?: string | null;
  room?: Rooms;

  roomImages: any[] | undefined = [];
  images: string[] = [];
  currentIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomsService
  ) {
    this.roomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.roomService.GetRoom(Number(this.roomId)).subscribe((data) => {
      this.room = data;

      this.roomImages = data.images;

      this.roomImages?.map((el) =>{
        (this.images.push(el.source));
    
      }); 
    });
  }
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }
  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
}
