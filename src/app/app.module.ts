import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HotelsComponent } from './hotels/hotels.component';
import { BookingsComponent } from './bookings/bookings.component';
import {SliderModule} from 'primeng/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import {  HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RoomCardComponent } from './room-card/room-card.component';
import { CardModule } from 'primeng/card';
import { RoomComponent } from './rooms/room/room.component';
import { HotelComponent } from './hotels/hotel/hotel.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HotelAdminComponent } from './hotel-admin/hotel-admin.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RoomsComponent,
    HotelsComponent,
    BookingsComponent,
    RoomCardComponent,
    RoomComponent,
    HotelComponent,
    LoginComponent,
    RegisterComponent,
    HotelAdminComponent,
    ProfileComponent
   
   
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateloader,
        deps: [HttpClient],
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwtToken'); // Or wherever you store the token
        },
        // ... other configuration options if needed ...
      }
    }),
    BreadcrumbModule,
    TableModule,
    TabViewModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,ButtonModule,SliderModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    CardModule
    
  ],
  providers: [
    provideHttpClient(withFetch()), provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateloader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}
