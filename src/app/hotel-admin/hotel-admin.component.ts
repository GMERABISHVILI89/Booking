import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../Services/image-upload.service';
import { HotelsService } from '../Services/hotels.service';

@Component({
  selector: 'app-hotel-admin',
  templateUrl: './hotel-admin.component.html',
  styleUrl: './hotel-admin.component.css'
})
export class HotelAdminComponent implements OnInit {
  hotel = {
    name: '',
    address: '',
    city: ''
  };
  hotelImage: File | null = null; // Store the selected image
  hotels: any[] = [];

  constructor(private hotelService: HotelsService) {}

  ngOnInit(): void {
    if (this.hotel.city) {
      this.getHotelsByCity(this.hotel.city);
    }
  }

  // Fetch hotels based on the city
  getHotelsByCity(city: string): void {
    this.hotelService.GetHotels(city).subscribe(
      (response) => {
        this.hotels = response;
      },
      (error) => {
        console.error('Error fetching hotels by city', error);
      }
    );
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
      city: ''
    };
    this.hotelImage = null;
  }
}