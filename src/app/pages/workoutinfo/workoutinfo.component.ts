import { Component } from '@angular/core';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { localStorageSession } from '../../shared/localStorage';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-booktour',
  templateUrl: './workoutinfo.component.html',
  styleUrl: './workoutinfo.component.css',
})
export class WorkoutInfoComponent {
  Id = 0;
  UserID: Number = 0;
  bookingTourId: Number = 0;
  locationImageUrl: string = '';
  IsEdit = false;
  List: any[] = [];
  Poster = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _localStorage: localStorageSession,
    private serviceService: ServiceService
  ) {
    this.UserID = Number(this._localStorage.getItem('User-Id'));
  }

  ngOnInit() {
    this.GetWorkoutDetail();
  }

  GetWorkoutDetail() {
    this.serviceService.GetWorkoutDetail(this.UserID).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleCopy(data: any) {
    $('#workoutName').val(data.workoutName);
    $('#description').val(data.workoutDescription);
    this.IsEdit = true;
    this.Id = data.id;
  }

  handleDelete(id: any) {
    this.serviceService.DeleteWorkoutDetail(id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Workout Successfully');
        this.GetWorkoutDetail();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleSubmit() {
    if (this.IsEdit) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  }

  handleAdd() {
    $('#workoutNameHelp').hide();
    $('#descriptionHelp').hide();

    if ($('#workoutName').val() === '') {
      $('#workoutNameHelp').show();
    }

    if ($('#description').val() === '') {
      $('#descriptionHelp').show();
    }

    if ($('#workoutName').val() === '' || $('#description').val() === '') {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userID: this.UserID,
      workoutName: $('#workoutName').val(),
      workoutDescription: $('#description').val(),
    };

    this.serviceService.AddWorkoutDetail(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit = false;
        this.openSnackBar('Add Workout Successfully');
        this.GetWorkoutDetail();
        this.handleClear();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEdit() {
    $('#workoutNameHelp').hide();
    $('#descriptionHelp').hide();

    if ($('#workoutName').val() === '') {
      $('#workoutNameHelp').show();
    }
    if ($('#description').val() === '') {
      $('#descriptionHelp').show();
    }

    if ($('#workoutName').val() === '' || $('#description').val() === '') {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.Id,
      userID: this.UserID,
      workoutName: $('#workoutName').val(),
      workoutDescription: $('#description').val(),
    };

    this.serviceService.UpdateWorkoutDetail(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit = false;
        this.openSnackBar('Update Workout Successfully');
        this.GetWorkoutDetail();
        this.handleClear();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleClear() {
    $('#workoutName').val('');
    $('#description').val('');
    this.IsEdit = false;
    this.Id = 0;
  }
}
