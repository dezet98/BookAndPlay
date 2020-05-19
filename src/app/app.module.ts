import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

// my own components, directives, modules etc
import { AppRoutingModule } from './app-routing.module';
import { AddTokenInterceptor } from './_auth/add-token.interceptor';
import { ResponseInterceptor } from './_auth/response.interceptor';
import { Config as con } from '../config';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SportsFacilitiesComponent } from './sports-facilities/sports-facilities.component';
import { YourObjectsComponent } from './your-objects/your-objects.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { OptionComponent } from './sports-facilities/option/option.component';
import { ObjectsComponent } from './sports-facilities/objects/objects.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { FirstStepComponent } from './add-object/first-step/first-step.component';
import { SecondStepComponent } from './add-object/second-step/second-step.component';
import { ThirdStepComponent } from './add-object/third-step/third-step.component';
import { DropzoneDirective } from './_shared/dropzone.directive';
import { ProfileComponent } from './profile/profile.component';
import { FacilityComponent } from './facility/facility.component';
import { AddRuleDialogComponent } from './your-objects/access-rules/add-rule-dialog/add-rule-dialog.component';

// angular material components
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AccessRulesComponent } from './your-objects/access-rules/access-rules.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { AddZeroPipe } from './_shared/add-zero.pipe';
import { DaysOfWeekPipe } from './_shared/days-of-week.pipe';
import { DayOfWeekPipe } from './_shared/day-of-week.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SportsFacilitiesComponent,
    YourObjectsComponent,
    ReservationsComponent,
    SignInComponent,
    SignUpComponent,
    AdminComponent,
    MainNavComponent,
    OptionComponent,
    ObjectsComponent,
    AddObjectComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    DropzoneDirective,
    ProfileComponent,
    FacilityComponent,
    AccessRulesComponent,
    AddRuleDialogComponent,
    AddZeroPipe,
    DaysOfWeekPipe,
    DayOfWeekPipe
  ],
  entryComponents: [
    AddRuleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: con.API_KEY,
      libraries: ['places']
    }),
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatStepperModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSliderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
