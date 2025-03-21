import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../Services/hotels.service';
import { Hotels } from '../Models/Hotels';
import { RoomsService } from '../Services/rooms.service';
import { CreateRoomDTO } from '../Models/CreateRoomDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rooms } from '../Models/Rooms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-admin',
  templateUrl: './hotel-admin.component.html',
  styleUrl: './hotel-admin.component.css'
})
export class HotelAdminComponent implements OnInit {
  hotel = {
    name: '',
    address: '',
    city: '',
    hotelImageUrl: ''  // Store image URL
  };
  room: CreateRoomDTO = {
    hotelId: 0,
    name: '',
    pricePerNight: 0,
    maximumGuests: 0,
    roomTypeId: 0,
    roomImages: [] // Initialize an empty array for images
  };
  roomForm!: FormGroup;


  hotelImage: File | null = null;
  hotels: Hotels[] = [];
  
  selectedImages: File[] = [];

  roomTypes: any[] = [
    { type: 'Single Room', value: 1 },
    { type: 'Double Room', value: 2 },
    { type: 'Triple Room', value: 3 },
    { type: 'Deluxe Room', value: 4 },
    { type: 'Family Room', value: 5 }
  ]; 
    
  
  constructor(private hotelService: HotelsService, private roomService: RoomsService, private fb:FormBuilder, private router:Router) {}

  ngOnInit(): void {


    this.getHotels(); 

    this.roomForm = this.fb.group({
      hotelId: [0, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      pricePerNight: ['', [Validators.required, Validators.min(1)]],
      maximumGuests: ['', [Validators.required, Validators.min(1)]],
      roomTypeId: [null, Validators.required],
      roomImages: [[], Validators.required]
    });
  }

  navigateToHotel(hotelId: number) {
    console.log(hotelId)
    this.router.navigate([`admin/hotelDetails/${hotelId}`]);
  }
  //ROOMS

  onRoomImagesSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedImages = Array.from(files);
    this.roomForm.patchValue({ roomImages: this.selectedImages });
  }

  onHotelSelect(event: any): void {
    const selectedHotelId = event.value;  
    console.log('Selected Hotel ID:', selectedHotelId);  
    this.roomForm.patchValue({ hotelId: selectedHotelId });  // Update form control with hotel ID
  }

onSubmit(): void {
  if (this.roomForm.valid) {
    const formData = new FormData();

    this.selectedImages.forEach(image => {
      formData.append('roomImages', image, image.name);
    });

    const roomData = {
      hotelId: String(this.roomForm.value.hotelId),
      name: String(this.roomForm.value.name),
      pricePerNight: String(this.roomForm.value.pricePerNight),
      maximumGuests: String(this.roomForm.value.maximumGuests),
      roomTypeId: String(this.roomForm.value.roomTypeId),
    };




    this.roomService.addRoom(roomData,this.selectedImages).subscribe({
      next: (response) => {
        console.log('Room added successfully!', response);
        alert('Room added successfully!');
        this.roomForm.reset();
        this.selectedImages = [];
      },
      error: (error) => {
        console.error('Error adding room:', error);
        alert('Failed to add room. Please try again.');
      }
    });
  }
}


//HOTELS

  // Fetch hotels (and image URLs) from backend
  getHotels(): void {
    this.hotelService.GetAll().subscribe((response) => {
      if (response.success) {
        this.hotels = response.data;
      }
    });
  }

  // Handle hotel image selection
  onHotelImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.hotelImage = file; // Store the file for submission
    }
  }

  // Add hotel logic
  addHotel(): void {
    if (this.hotel.name && this.hotel.address && this.hotel.city && this.hotelImage) {
      this.hotelService.AddHotel(this.hotel, this.hotelImage).subscribe(
        (response) => {
          if (response.success) {
            console.log('Hotel added successfully', response);
            alert("Hotel Added Successfully.")
            this.resetForm();
          } else {
            console.error('Failed to add hotel:', response.message);
          }
        },
        (error) => {
          console.error('Error adding hotel', error);
        }
      );
    } else {
      console.error('Please fill all hotel details and select an image.');
      alert('Please fill all hotel details and select an image.');

    }
  }

  // Reset form fields after successful hotel addition
  resetForm(): void {
    this.hotel = {
      name: '',
      address: '',
      city: '',
      hotelImageUrl: ''
    };
    this.hotelImage = null;
  }
  resetRoomForm():void{
      this.room = {
      name: '',
      pricePerNight: 0,
      maximumGuests: 0,
      roomTypeId: 0,
      roomImages: [] 
    }
  }
}