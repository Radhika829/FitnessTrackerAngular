import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  // provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialUiModule } from './shared/material-ui/material-ui.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RpasswordComponent } from './pages/rpassword/rpassword.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { CustomerRoutineComponent } from './pages/customerroutineComponent/customerroutine.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { WorkoutInfoComponent } from './pages/workoutinfo/workoutinfo.component';
import { UserdataComponent } from './pages/userdata/userbooking.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { RoutineComponent } from './pages/routineComponent/routine.component';
import { GoalComponent } from './pages/goal/goal.component';
import { HealthGraphComponent } from './pages/healthgraph/healthgraph.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    RpasswordComponent,
    UserdashboardComponent,
    UserhomeComponent,
    CustomerRoutineComponent,
    UserprofileComponent,
    WorkoutInfoComponent,
    UserdataComponent,
    WelcomepageComponent,
    RoutineComponent,
    GoalComponent,
    HealthGraphComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    MaterialUiModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
