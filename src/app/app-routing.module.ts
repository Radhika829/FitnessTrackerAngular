import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RpasswordComponent } from './pages/rpassword/rpassword.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { CustomerRoutineComponent } from './pages/customerroutineComponent/customerroutine.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { WorkoutInfoComponent } from './pages/workoutinfo/workoutinfo.component';
import { UserdataComponent } from './pages/userdata/userbooking.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { RoutineComponent } from './pages/routineComponent/routine.component';
import { GoalComponent } from './pages/goal/goal.component';
import { HealthGraphComponent } from './pages/healthgraph/healthgraph.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomepageComponent, //
  },
  {
    path: 'signIn',
    component: SigninComponent, //
  },
  {
    path: 'signup',
    component: SignupComponent, //
  },
  {
    path: 'resetpassword',
    component: RpasswordComponent, //
  },
  {
    path: 'userdashboard',
    component: UserdashboardComponent,
    children: [
      {
        path: 'home', //
        component: UserhomeComponent,
      },
      {
        path: 'profile',
        component: UserprofileComponent, //
      },
      {
        path: 'customerroutine',
        component: CustomerRoutineComponent, //
      },

      {
        path: 'workoutinfo',
        component: WorkoutInfoComponent, //
      },

      {
        path: 'goal',
        component: GoalComponent,
      },
      {
        path: 'routine',
        component: RoutineComponent,
      },
      {
        path: 'graphanalysis', //
        component: UserdataComponent,
      },
      {
        path: 'healthgraphanalysis',
        component: HealthGraphComponent, //
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
