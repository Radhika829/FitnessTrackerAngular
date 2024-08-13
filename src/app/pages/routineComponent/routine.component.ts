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
  selector: 'app-adminhalllist',
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css',
})
export class RoutineComponent {
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
    this.GetInterviewList();
  }

  GetInterviewList() {
    this.serviceService.GetPersonalRoutine(this.UserID).subscribe({
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

  handleSubmit() {
    if (this.IsEdit) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  }

  handleClear() {
    $('#typeHelp').hide();
    $('#startDateHelp').hide();
    $('#endDateHelp').hide();
    $('#dataHelp').hide();

    $('#startDate').val('');
    $('#endDate').val('');
    $('#data').val('');
    this.IsEdit = false;
  }

  handleAdd() {
    $('#typeHelp').hide();
    $('#startDateHelp').hide();
    $('#endDateHelp').hide();
    $('#dataHelp').hide();
    let Value = false;
    if ($('#type').val() === '') {
      $('#typeHelp').show();
      Value = true;
    }

    if ($('#startDate').val() === '') {
      $('#startDateHelp').show();
      Value = true;
    }

    if ($('#endDate').val() === '') {
      $('#endDateHelp').show();
      Value = true;
    }

    if ($('#data').val() === '') {
      $('#dataHelp').show();
      Value = true;
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Value');
      return;
    }

    let data = {
      userId: this.UserID,
      type: $('#type').val(),
      startDate: $('#startDate').val(),
      endDate: $('#endDate').val(),
      data: $('#data').val(),
    };
    this.serviceService.AddPersonalRoutine(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Personal Routine Successfully');
        this.handleClear();
        this.GetInterviewList();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleEdit() {
    $('#typeHelp').hide();
    $('#startDateHelp').hide();
    $('#endDateHelp').hide();
    $('#dataHelp').hide();
    let Value = false;
    if ($('#type').val() === '') {
      $('#typeHelp').show();
      Value = true;
    }

    if ($('#startDate').val() === '') {
      $('#startDateHelp').show();
      Value = true;
    }

    if ($('#endDate').val() === '') {
      $('#endDateHelp').show();
      Value = true;
    }

    if ($('#data').val() === '') {
      $('#dataHelp').show();
      Value = true;
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Value');
      return;
    }

    let data = {
      id: this.ID,
      userId: this.UserID,
      type: $('#type').val(),
      startDate: $('#startDate').val(),
      endDate: $('#endDate').val(),
      data: $('#data').val(),
    };

    this.serviceService.UpdatePersonalRoutine(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Personal Routine Successfully');
        this.handleClear();
        this.GetInterviewList();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleEditDetail(id: any) {
    this.router.navigate(['/admindashboard/userdata/' + id + '/true']);
  }

  handleDeleteBooking(id: any) {
    this.serviceService.DeletePersonalRoutine(id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Theater Successfully');
        this.handleClear();
        this.GetInterviewList();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
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

  handleCopy(data: any) {
    $('#type').val(data.type);
    $('#startDate').val(data.startDate);
    $('#endDate').val(data.endDate);
    $('#data').val(data.data);
    this.IsEdit = true;
    this.ID = data.id;
  }

  handleDelete(id: any) {
    this.serviceService.DeletePersonalRoutine(id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Personal Routine Successfully');
        this.handleClear();
        this.GetInterviewList();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }
}
