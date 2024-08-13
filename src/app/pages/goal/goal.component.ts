import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';
import { BusinessService } from '../../services/business.service';
@Component({
  selector: 'app-userhalllist',
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css',
})
export class GoalComponent {
  List: any[] = [];
  IsEdit = false;
  ID = 0;
  UserID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private _localStorage: localStorageSession,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private businessService: BusinessService
  ) {
    this.UserID = Number(this._localStorage.getItem('User-Id'));
  }

  ngOnInit(): void {
    this.GetFitnessGoal();
  }

  GetFitnessGoal() {
    this.serviceService.GetFitnessGoal(this.UserID).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error: any) => {
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
    $('#setHelp').hide();
    $('#repsHelp').hide();

    if ($('#workoutName').val() === '') {
      $('#workoutNameHelp').show();
    }
    if ($('#set').val() === '') {
      $('#setHelp').show();
    }

    if ($('#reps').val() === '') {
      $('#repsHelp').show();
    }

    if (
      $('#reps').val() === '' ||
      $('#set').val() === '' ||
      $('#workoutName').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: this.UserID,
      day: $('#day').val(),
      workOutName: $('#workoutName').val(),
      sets: Number($('#set').val()),
      reps: Number($('#reps').val()),
    };

    this.serviceService.AddFitnessGoal(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Fitness Goal Successfully');
        this.GetFitnessGoal();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEdit() {
    $('#workoutNameHelp').hide();
    $('#setHelp').hide();
    $('#repsHelp').hide();

    if ($('#workoutName').val() === '') {
      $('#workoutNameHelp').show();
    }
    if ($('#set').val() === '') {
      $('#setHelp').show();
    }

    if ($('#reps').val() === '') {
      $('#repsHelp').show();
    }

    if (
      $('#reps').val() === '' ||
      $('#set').val() === '' ||
      $('#workoutName').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.ID,
      userId: this.UserID,
      day: $('#day').val(),
      workOutName: $('#workoutName').val(),
      sets: Number($('#set').val()),
      reps: Number($('#reps').val()),
    };

    this.serviceService.UpdateFitnessGoal(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Fitness Goal Successfully');
        this.GetFitnessGoal();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleClear() {
    $('#workoutNameHelp').hide();
    $('#setHelp').hide();
    $('#repsHelp').hide();

    $('#workoutName').val('MONDAY');
    $('#workoutName').val('');
    $('#set').val('');
    $('#reps').val('');

    this.ID = 0;
    this.IsEdit = false;
  }

  handleCopy(data: any) {
    $('#workoutName').val(data.workOutName);
    $('#set').val(data.sets);
    $('#reps').val(data.reps);
    this.ID = data.id;
    this.IsEdit = true;
  }
  handleDelete(id: any) {
    this.serviceService.DeleteFitnessGoal(id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Fitness Goal Successfully');
        this.GetFitnessGoal();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }
}
