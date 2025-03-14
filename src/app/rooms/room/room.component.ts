import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../Services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rooms } from '../../Models/Rooms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../Services/booking.service';
import { differenceInDays } from 'date-fns';
import { HotelsService } from '../../Services/hotels.service';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { MenuItem } from '../../Models/MenuItem';
import { ServiceResponse } from '../../Models/ServiceResponse';
import { Hotels } from '../../Models/Hotels';
import { AuthServiceService } from '../../Services/auth-service.service';

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
    '../../../assets/Images/random6.JPG',
  ];

  activeIndex: number = 0;
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
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
  isAuthenticated: boolean = false;
  private authSubscription: Subscription | undefined;

  userid:any | undefined;
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private rout: Router,
    private hotelService: HotelsService,
    private authService:AuthServiceService
  ) {
    this.roomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.authService.getUserId().subscribe(data => {
      this.userid = data;
    })
    this.authSubscription = this.authService.isAuthenticated.subscribe(
      (status) => {
          this.isAuthenticated = status;
      }
    );
    window.scrollTo(0, 0);
     this.hotelService.GetAll().subscribe(
         (response: ServiceResponse<Hotels[]>) => {  // Ensure the response is of type ServiceResponse<Hotels[]>
           if (response && response.success && response.data) {
             this.hotels = response.data;
             console.log(this.hotels)  // Assign the hotel data to the hotels array
           } else {
             console.error('Failed to retrieve hotels:', response.message);
             // Optionally handle the failure, e.g., display a message to the user
           }
         },
         (error) => {
           console.error('Error fetching hotels:', error);
           // Handle error, e.g., display an error message
         }
       );

    this.items = [{ label: 'Home' }, { label: 'rooms' }, { label: 'room' }];

    this.items = [
      { label: 'Home', route: '/home' },
      { label: 'Rooms', route: '/rooms' },
      { label: 'room' },
    ];

    this.roomService.GetRoom(Number(this.roomId)).subscribe(response=> {
     
      if(response.success){
        this.room = response.data
        this.roomPricePerNight = response.data.pricePerNight;
        this.roomImages = response.data.imageUrls;
        this.roomTypeID = response.data.roomTypeId;
      }
     
 
  
      this.roomImages?.map((el) => {
        this.images.push(el);
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
          return false;
        }
      })
    );
    scroll$.subscribe((isScrolled) => (this.showButton = isScrolled));
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
        this.authSubscription.unsubscribe();
    }
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
    if (!this.isAuthenticated){
      alert("გთოხვთ ჯავშნისთვის გაიაროთ ავტორიზაცია. /  Please Login For Reservation ")
      return;
    } 
    if (this.bookingForm.valid) {
      this.bookData = {
   
        RoomId: Number(this.roomId),
        CheckInDate: this.bookingForm.controls['checkInDate'].value,
        CheckOutDate: this.bookingForm.controls['checkOutDate'].value,
        TotalPrice: this.totalPrice,
        isConfirmed: true,
        customerName: this.bookingForm.controls['customerName'].value,
        customerId: this.userid,
        customerPhone: this.bookingForm.controls['customerPhone'].value,
      };

      this.bookingService.addBooking(this.bookData).subscribe((data) => {
        this.bookingForm.reset();
      });
      alert('ოთახი წარმატებით დაიჯავშნა ! გისრუვებთ ბედნიერ დასვენებას');
      this.bookingForm.reset();
    } else {
      alert('გთხოვთ შეავსოთ შეავსოთ სავალდებულო ველები !');
    }
  }

 
  
}
function uuidv4() {
  throw new Error('Function not implemented.');
}

