import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../Services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rooms } from '../../Models/Rooms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../Services/booking.service';
import { differenceInDays } from 'date-fns';
import { HotelsService } from '../../Services/hotels.service';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {

  commentImages: string[] = [
    '../../../assets/Images/random4.JPG',
    '../../../assets/Images/random2.JPG',
    '../../../assets/Images/random3.JPG',
    '../../../assets/Images/random5.JPG',
    '../../../assets/Images/random6.JPG'
  ];

  activeIndex: number = 0;

  roomId?: string | null;
  room?: Rooms;
  bookingForm!: FormGroup;
  roomImages: any[] | undefined = [];
  images: string[] = [];
  hotelImages: any[] = [];
  currentIndex: number = 0;
  bookData: any;
  roomPricePerNight: any;
  totalPrice: number | null = null;
  roomTypeID: any;
  showButton: boolean = false;
  threshold: number = 50;
  hotels: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private rout: Router,
    private hotelService: HotelsService
  ) {
    this.roomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.hotelService.GetAll().subscribe((hotel) => {
      this.hotels = hotel;
    });

    this.roomService.GetRoom(Number(this.roomId)).subscribe((data) => {
      this.room = data;
      this.roomPricePerNight = data.pricePerNight;
      this.roomImages = data.images;
      this.roomTypeID = data.roomTypeId;
      this.roomImages?.map((el) => {
        this.images.push(el.source);
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
      customerPhone: ['', [Validators.required]],
    });
    this.bookingForm.valueChanges.subscribe(() => this.calculateTotalPrice());

    const scroll$ = fromEvent(window, 'scroll').pipe(
      debounceTime(50),
      map(() => {
        try {
          return window.scrollY > this.threshold;
        } catch (error) {
          console.error('Error obtaining scroll position:', error);
          return false;
        }
      })
    );
    scroll$.subscribe((isScrolled) => (this.showButton = isScrolled));
  }
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  calculateTotalPrice() {
    const checkInDate = this.bookingForm.get('checkInDate')?.value;
    const checkOutDate = this.bookingForm.get('checkOutDate')?.value;

    if (checkInDate && checkOutDate) {
      const days = differenceInDays(
        new Date(checkOutDate),
        new Date(checkInDate)
      );
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
  goToHotel(id: number) {
    this.rout.navigateByUrl(`/hotel/${id}`);
  }
  onSubmit() {
    debugger;
    console.log(this.bookingForm);
    if (this.bookingForm.valid) {
      console.log(this.bookingForm);
      this.bookData = {
        id: 111,
        roomID: Number(this.roomId),
        checkInDate: this.bookingForm.controls['checkInDate'].value,
        checkOutDate: this.bookingForm.controls['checkOutDate'].value,
        totalPrice: this.totalPrice,
        isConfirmed: true,
        customerName: this.bookingForm.controls['customerName'].value,
        customerId: '1112',
        customerPhone: this.bookingForm.controls['customerPhone'].value,
      };
      this.bookingService.addBooking(this.bookData).subscribe((data) => {
        console.log(data);
        this.bookingForm.reset();
      });
      alert('ოთახი წარმატებით დაიჯავშნა ! გისრუვებთ ბედნიერ დასვენებას');
      this.bookingForm.reset();
    } else {
      alert('გთხოვთ შეავსოთ შეავსოთ სავალდებულო ველები !');
    }
  }
}
