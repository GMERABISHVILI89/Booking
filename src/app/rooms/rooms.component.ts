import { Component, OnInit } from '@angular/core';
import { GuestQuantity, RoomType } from '../Models/RoomType';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Filter } from '../Models/Filter';
import { RoomsService } from '../Services/rooms.service';
import { Rooms } from '../Models/Rooms';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})

export class RoomsComponent implements OnInit {

  roomForm!: FormGroup;
  rooms?: Rooms[];
  guestQuantity?: GuestQuantity[] | undefined;  
  filterData?: Filter;
  rangeValues: number[] = [20, 80];
  types?: RoomType[];
  selectedType?: number;
  dateFrom?: Date | undefined;
  dateTo?: Date | undefined;
  filteredRooms?:any [] = [];
  showButton: boolean = false;
  threshold: number = 50;
  constructor(private fb: FormBuilder, private roomService: RoomsService) {
    this.types = [{ id: 1, name: "Single Room" }, { id: 2, name: "Double Room" }, { id: 3, name: "Deluxe Room" }];
    this.guestQuantity = [{ val: 1 }, { val: 2 }, { val: 3 }, { val: 4 }, { val: 5 }, { val: 6 }, { val: 7 }, { val: 8 }, { val: 9 }, { val: 10}];
  }


  ngOnInit() {

    this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
      this.filteredRooms = [...this.rooms];
      console.log(this.rooms)
    })
   
    this.roomForm = this.fb.group({
      roomTypeId: [null, Validators.required],
      priceFrom: [50, [Validators.required, Validators.min(0)]],
      priceTo: [500, [Validators.required, Validators.min(0)]],
      priceRange: [[50, 500], Validators.required],
      maximumGuests: [null, [Validators.required, Validators.min(1)]],
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required]
    });

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

  onPriceRangeChange(event: any) {
    const values = event.values;
    this.roomForm.patchValue({
      priceFrom: values[0],
      priceTo: values[1]
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      this.filterData = {
        roomTypeId: this.roomForm.value.roomTypeId.id,
        priceFrom: this.roomForm.value.priceFrom,
        priceTo: this.roomForm.value.priceTo,
        maximumGuests: this.roomForm.value.maximumGuests.val,
        checkIn: this.roomForm.value.checkIn,
        checkOut: this.roomForm.value.checkOut
      }
      // this.rooms?.push(<Rooms>data)
      this.roomService.getFiltered(this.filterData).subscribe(data => {
        this.rooms = data
        this.filteredRooms = data;

      })

    }
    else {
      alert("გთხოვთ შეავსოთ ფილტრი !")
    }
  }

  filterRooms(param:number){
    if(param != 0){
      this.filteredRooms = []
      this.rooms?.map(el => {
       if(el.roomTypeId == param){
         this.filteredRooms?.push(el)
      }
      }); 
    }
    else{
      this.filteredRooms = [...this.rooms!];
    }
   
   
    
  }
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

}
