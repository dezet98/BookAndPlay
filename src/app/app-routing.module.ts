import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SportsFacilitiesComponent } from './sports-facilities/sports-facilities.component';
import { YourObjectsComponent } from './your-objects/your-objects.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardService } from './_auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sportsFacilities', component: SportsFacilitiesComponent },
  { path: 'yourObjects', component: YourObjectsComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'signIn', component: SignInComponent, canActivate: [AuthGuardService]},
  { path: 'signUp', component: SignUpComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
