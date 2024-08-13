import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css',
})
export class UserhomeComponent {
  List: any[] = [];
  userID = 0;
  ID = 0;
  IsEdit = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public serviceService: ServiceService,
    private businessService: BusinessService,
    private _localStorage: localStorageSession,
    private _snackBar: MatSnackBar
  ) {
    this.userID = this._localStorage.getItem('User-Id');
  }

  ngOnInit(): void {
    this.GetDiet();
  }

  GetDiet() {
    this.serviceService.GetDiet(this.userID).subscribe({
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

  handleNevigateTour() {
    this.router.navigate(['/userdashboard/customerroutine']);
  }

  handleSubmit() {
    if (this.IsEdit) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  }

  handleAdd() {
    $('#dateHelp').hide();
    $('#titleHelp').hide();
    $('#descriptionHelp').hide();
    $('#neutritionHelp').hide();

    let Value = false;
    if ($('#date').val() === '') {
      $('#dateHelp').show();
      Value = true;
    }
    if ($('#title').val() === '') {
      $('#titleHelp').show();
      Value = true;
    }
    if ($('#description').val() === '') {
      Value = true;
      $('#descriptionHelp').show();
    }
    if ($('#neutrition').val() === '') {
      Value = true;
      $('#neutritionHelp').show();
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: this.userID,
      date: $('#date').val(),
      title: $('#title').val(),
      description: $('#description').val(),
      nutritionDescription: $('#neutrition').val(),
    };

    this.serviceService.AddDiet(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Diet Successfully');
        this.handleClear();
        this.GetDiet();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEdit() {
    $('#dateHelp').hide();
    $('#titleHelp').hide();
    $('#descriptionHelp').hide();
    $('#neutritionHelp').hide();

    let Value = false;
    if ($('#date').val() === '') {
      $('#dateHelp').show();
      Value = true;
    }
    if ($('#title').val() === '') {
      $('#titleHelp').show();
      Value = true;
    }
    if ($('#description').val() === '') {
      Value = true;
      $('#descriptionHelp').show();
    }
    if ($('#neutrition').val() === '') {
      Value = true;
      $('#neutritionHelp').show();
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.ID,
      userId: this.userID,
      date: $('#date').val(),
      title: $('#title').val(),
      description: $('#description').val(),
      nutritionDescription: $('#neutrition').val(),
    };

    this.serviceService.UpdateDiet(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Diet Successfully');
        this.handleClear();
        this.GetDiet();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleClear() {
    $('#date').val('');
    $('#title').val('');
    $('#description').val('');
    $('#neutrition').val('');
    this.IsEdit = false;
  }

  handleCopy(data: any) {
    this.ID = data.id;
    $('#date').val(data.date);
    $('#title').val(data.title);
    $('#description').val(data.description);
    $('#neutrition').val(data.nutritionDescription);
    this.IsEdit = true;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleDelete(Id: any) {
    this.serviceService.DeleteDiet(Id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Diet Successfully');
        this.handleClear();
        this.GetDiet();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }
}
