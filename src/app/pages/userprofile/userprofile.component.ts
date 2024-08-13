import { Component } from '@angular/core';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { localStorageSession } from '../../shared/localStorage';
import { ServiceService } from '../../services/service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent {
  ProfileID = 0;
  userID: any = 0;
  IsEdit = false;
  ID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private router: Router,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _localStorage: localStorageSession,
    private serviceService: ServiceService,
    private http: HttpClient
  ) {
    this.userID = this._localStorage.getItem('User-Id');
  }

  ngOnInit(): void {
    this.getProfileDetail();
  }

  getProfileDetail() {
    let UserID = this._localStorage.getItem('User-Id');
    this.serviceService.GetProfile(UserID).subscribe({
      next: (result: any) => {
        this.ProfileID = result.id;
        $('#name').val(result.fullName);
        $('#email').val(result.email);
        $('#address').val(result.address);
        $('#contact').val(Number(result.contact));
        this.IsEdit = true;
      },
      error: (error: any) => {
        this.openSnackBar('Something went wrong');
        this.IsEdit = false;
      },
    });
  }

  handleSubmit() {
    //
    if (this.IsEdit) {
      this.handleEditProfile();
    } else {
      this.handleAddProfile();
    }
  }

  handleAddProfile() {
    $('#nameHelp').hide();
    $('#emailHelp').hide();
    $('#addressHelp').hide();
    $('#contactHelp').hide();

    if ($('#name').val() === '') {
      $('#nameHelp').show();
    }
    if ($('#email').val() === '') {
      $('#emailHelp').show();
    }
    if ($('#contact').val() === '') {
      $('#contactHelp').show();
    }
    if ($('#address').val() === '') {
      $('#addressHelp').show();
    }
    if (
      $('#name').val() === '' ||
      $('#email').val() === '' ||
      $('#contact').val() === '' ||
      $('#address').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: this.userID,
      fullName: $('#name').val(),
      email: $('#email').val(),
      address: $('#address').val(),
      contact: $('#contact').val(),
    };

    this.serviceService.AddProfile(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit = false;
        this.openSnackBar('Create Profile Successfully');
        this.getProfileDetail();
        this.handleClear();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEditProfile() {
    $('#nameHelp').hide();
    $('#emailHelp').hide();
    $('#addressHelp').hide();
    $('#contactHelp').hide();

    if ($('#name').val() === '') {
      $('#nameHelp').show();
    }
    if ($('#email').val() === '') {
      $('#emailHelp').show();
    }
    if ($('#contact').val() === '') {
      $('#contactHelp').show();
    }
    if ($('#address').val() === '') {
      $('#addressHelp').show();
    }

    if (
      $('#name').val() === '' ||
      $('#email').val() === '' ||
      $('#contact').val() === '' ||
      $('#address').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: this.userID,
      fullName: $('#name').val(),
      email: $('#email').val(),
      address: $('#address').val(),
      contact: $('#contact').val(),
    };

    this.serviceService.UpdateProfile(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit = false;
        this.openSnackBar('Update Profile Successfully');
        this.getProfileDetail();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleClear() {
    this.IsEdit = false;
    $('#name').val('');
    $('#email').val('');
    $('#address').val('');
    $('#contact').val('');
  }
}
