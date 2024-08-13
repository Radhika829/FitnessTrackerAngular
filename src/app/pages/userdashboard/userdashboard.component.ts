import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageSession } from '../../shared/localStorage';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css',
})
export class UserdashboardComponent {
  constructor(
    private router: Router,
    private _localStorage: localStorageSession
  ) {}

  handleNavHome() {
    console.log('Navigate To Home');
    this.router.navigate(['/userdashboard/home']);
  }

  handleNavProfile() {
    console.log('Navigate To Profile');
    this.router.navigate(['/userdashboard/profile']);
  }

  handleNavMyBooking() {
    console.log('Navigate To My Booking');
    this.router.navigate(['/userdashboard/customerroutine']);
  }

  handleNavWorkOutInfo() {
    this.router.navigate(['/userdashboard/workoutinfo']);
  }

  handleNavGoal() {
    this.router.navigate(['/userdashboard/goal']);
  }

  handleNavMyRoutine() {
    this.router.navigate(['/userdashboard/routine']);
  }

  handleTheatersNav() {
    this.router.navigate(['/userdashboard/hallList']);
  }

  handleNavSignOut() {
    console.log('Navigate To SignOut');
    this._localStorage.removeItem('User-Id');
    this._localStorage.removeItem('User-Token');
    this._localStorage.removeItem('User-Email');
    this.router.navigate(['']);
  }
}
