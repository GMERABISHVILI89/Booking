import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent implements OnInit{
 @Input() room:any;
 constructor(private route:Router) {
 }

 ngOnInit(): void {
  
 }

 getRoomId(id:any){
  this.route.navigateByUrl(`/room/${id}`)
 }
}
