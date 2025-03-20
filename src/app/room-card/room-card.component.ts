import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent implements OnInit{
 @Input() room:any;

 @Input() filterType:string | undefined= "Default";
 constructor(private route:Router) {
  console.log(this.room)
 }

 ngOnInit(): void {
  console.log(this.room)
 }

 getRoomId(id:any){
  this.route.navigateByUrl(`/room/${id}`)
 }
}
