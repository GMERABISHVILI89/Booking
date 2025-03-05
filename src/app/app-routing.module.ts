import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BookingsComponent } from './bookings/bookings.component';
import { RoomComponent } from './rooms/room/room.component';
import { HotelComponent } from './hotels/hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'hotel/:id', component: HotelComponent },

  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
