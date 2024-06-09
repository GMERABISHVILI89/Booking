import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RoomsService } from '../../Services/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { Rooms } from '../../Models/Rooms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../Services/booking.service';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  roomId?: string | null;
  room?: Rooms;
  bookingForm!: FormGroup;
  roomImages: any[] | undefined = [];
  images: string[] = [];
  currentIndex: number = 0;
  bookData:any;
  roomPricePerNight:any;
  totalPrice: number | null = null;
  roomTypeID:any;
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private fb: FormBuilder,
    private bookingService:BookingService
  ) {
    this.roomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.roomService.GetRoom(Number(this.roomId)).subscribe((data) => {
      this.room = data;
      this.roomPricePerNight = data.pricePerNight;
      this.roomImages = data.images;
      this.roomTypeID= data.roomTypeId;
      this.roomImages?.map((el) =>{
        (this.images.push(el.source));
    
      }); 
    });

    this.bookingForm = this.fb.group({
      roomID: [null],
      isConfirmed: [null],
      customerId: [null],
      totalPrice: [null],
      checkInDate: [null, Validators.required],
      checkOutDate: [null, Validators.required],
      customerName: [null, Validators.required],
      customerPhone: ['', [Validators.required]]
    });
    this.bookingForm.valueChanges.subscribe(() => this.calculateTotalPrice());

  }
  calculateTotalPrice() {
    const checkInDate = this.bookingForm.get('checkInDate')?.value;
    const checkOutDate = this.bookingForm.get('checkOutDate')?.value;

    if (checkInDate && checkOutDate) {
      const days = differenceInDays(new Date(checkOutDate), new Date(checkInDate));
      this.totalPrice = days > 0 ? days * this.roomPricePerNight : null;
    } else {
      this.totalPrice = null;
    }
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

  onSubmit() {
    debugger
     console.log(this.bookingForm)
    if (this.bookingForm.valid) {
      console.log(this.bookingForm)
      this.bookData = {
        id:111,
        roomID: Number(this.roomId),
        checkInDate: this.bookingForm.controls['checkInDate'].value,
        checkOutDate: this.bookingForm.controls['checkOutDate'].value,
        totalPrice:this.totalPrice,
        isConfirmed:true,
        customerName:this.bookingForm.controls['customerName'].value,
        customerId:"1112",
        customerPhone:this.bookingForm.controls['customerPhone'].value
        
      }
      console.log(this.bookData)
      this.bookingService.addBooking(this.bookData).subscribe(data => {
       console.log(data)
      })

    }
    else {
      alert("გთხოვთ შეავსოთ შეავსოთ სავალდებულო ველები !")
    }
  }

}
