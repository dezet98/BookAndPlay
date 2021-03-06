import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SportsFacilitiesComponent } from './sports-facilities/sports-facilities.component';
import { YourObjectsComponent } from './your-objects/your-objects.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './_auth/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { FacilityComponent } from './facility/facility.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sportsFacilities', component: SportsFacilitiesComponent },
  { path: 'facility/:id', component: FacilityComponent },
  { path: 'yourObjects', component: YourObjectsComponent },
  { path: 'addObject', component: AddObjectComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signIn', component: SignInComponent, canActivate: [AuthGuardService] },
  { path: 'signUp', component: SignUpComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
