import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../Services/image-upload.service';
import { HotelsService } from '../Services/hotels.service';
import { Hotels } from '../Models/Hotels';

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
  hotelImage: File | null = null;
  hotels: Hotels[] = [];
  
  
  constructor(private hotelService: HotelsService) {}

  ngOnInit(): void {
    this.getHotels(); // Get hotels on load
  }

  // Fetch hotels (and image URLs) from backend
  getHotels(): void {
    this.hotelService.GetAll().subscribe((response) => {
      if (response.success) {
        this.hotels = response.data;
        console.log(this.hotels)
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
}