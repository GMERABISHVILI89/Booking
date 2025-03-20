import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotels } from '../../Models/Hotels';
import { HotelsService } from '../../Services/hotels.service';
import { ServiceResponse } from '../../Models/ServiceResponse';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotels = {
    id: undefined,
    name: '',
    address: '',
    city: '',
    hotelImage: ''
  };
  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const hotelId = Number(this.route.snapshot.paramMap.get('id'));
    if (hotelId) {
      this.getHotelDetails(hotelId);
    }
  }

   getHotelDetails(hotelId: number): void {
    this.hotelService.getHotelById(hotelId).subscribe(
      (response) => {
        if (response.success) {
          this.hotel = response.data;
        } else {
          alert('Hotel not found!');
        }
      },
      (error) => {
        console.error('Error fetching hotel details:', error);
      }
    );
  }

  onHotelImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.hotel.hotelImage = file.name;
    }
  }

  updateHotel(): void {
    const hotelId = Number(this.route.snapshot.paramMap.get('id'));
    if (!hotelId) {
      console.error('Hotel ID not found.');
      return;
    }
  
    const hotelData = {
      name: this.hotel.name,
      address: this.hotel.address,
      city: this.hotel.city,
      hotelImage: this.selectedImage ? this.selectedImage : '' // Use selectedImage
    };
    console.log('FormData:', hotelData);
    this.hotelService.updateHotel(hotelId, hotelData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Hotel updated successfully:', response);
          this.router.navigate(['/hotels']); // Navigate back to hotels list
          // Optionally, show a success message to the user
        } else {
          console.error('Failed to update hotel:', response);
          // Optionally, show an error message to the user
        }
      },
      error: (error) => {
        console.error('Error updating hotel:', error);
        // Optionally, show an error message to the user
      },
    });
  }


  deleteHotel(): void {
    const hotelId = this.hotel.id!;
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(hotelId).subscribe(
        (response) => {
          if (response.success) {
            alert('Hotel deleted successfully!');
            this.router.navigate(['/admin/hotels']);  // Redirect to the hotel list or dashboard
          } else {
            alert('Error deleting hotel: ' + response.message);
          }
        },
        (error) => {
          console.error('Error deleting hotel:', error);
          alert('Failed to delete hotel.');
        }
      );
    }
  }
}