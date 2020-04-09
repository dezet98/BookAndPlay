import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SportsFacilitiesComponent } from './sports-facilities/sports-facilities.component';
import { YourObjectsComponent } from './your-objects/your-objects.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddTokenInterceptor } from './_auth/add-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SportsFacilitiesComponent,
    YourObjectsComponent,
    ReservationsComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
