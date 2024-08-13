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
  selector: 'app-edittour',
  templateUrl: './customerroutine.component.html',
  styleUrl: './customerroutine.component.css',
})
export class CustomerRoutineComponent {
  ProfileID = 0;
  List1: any[] = [];
  List2: any[] = [];
  userID: any = 0;
  IsEdit1 = false;
  IsEdit2 = false;
  ID1 = 0;
  ID2 = 0;
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
    this.GetPerformProgress();
    this.GetHealth();
  }

  GetPerformProgress() {
    let UserID = this._localStorage.getItem('User-Id');
    this.serviceService.GetPerformProgress(UserID).subscribe({
      next: (result: any) => {
        this.List1 = result;
      },
      error: (error: any) => {
        this.openSnackBar('Something went wrong');
        this.IsEdit1 = false;
      },
    });
  }

  GetHealth() {
    let UserID = this._localStorage.getItem('User-Id');
    this.serviceService.GetHealth(UserID).subscribe({
      next: (result: any) => {
        this.List2 = result;
      },
      error: (error: any) => {
        this.openSnackBar('Something went wrong');
        this.IsEdit1 = false;
      },
    });
  }

  handleSubmit1() {
    //
    if (this.IsEdit1) {
      this.handleEdit1();
    } else {
      this.handleAdd1();
    }
  }

  handleAdd1() {
    $('#date1Help').hide();
    $('#weightHelp').hide();
    $('#caloriesHelp').hide();

    if ($('#date1').val() === '') {
      $('#date1Help').show();
    }
    if ($('#weight').val() === '') {
      $('#weightHelp').show();
    }
    if ($('#calories').val() === '') {
      $('#caloriesHelp').show();
    }

    if (
      $('#date1').val() === '' ||
      $('#weight').val() === '' ||
      $('#calories').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: this.userID,
      weight: Number($('#weight').val()),
      date: $('#date1').val(),
      calorie: Number($('#calories').val()),
    };

    this.serviceService.AddPerformProgress(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit1 = false;
        this.openSnackBar('Add Performance Progress Successfully');
        this.GetPerformProgress();
        this.handleClear1();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEdit1() {
    $('#date1Help').hide();
    $('#weightHelp').hide();
    $('#caloriesHelp').hide();

    if ($('#date1').val() === '') {
      $('#date1Help').show();
    }
    if ($('#weight').val() === '') {
      $('#weightHelp').show();
    }
    if ($('#calories').val() === '') {
      $('#caloriesHelp').show();
    }

    if (
      $('#date1').val() === '' ||
      $('#weight').val() === '' ||
      $('#calories').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.ID1,
      userId: this.userID,
      weight: Number($('#weight').val()),
      date: $('#date1').val(),
      calorie: Number($('#calories').val()),
    };

    this.serviceService.UpdatePerformProgress(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit1 = false;
        this.openSnackBar('Update Performance Progress Successfully');
        this.GetPerformProgress();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleSubmit2() {
    //
    if (this.IsEdit2) {
      this.handleEdit2();
    } else {
      this.handleAdd2();
    }
  }

  handleAdd2() {
    $('#date2Help').hide();
    $('#heartrateHelp').hide();
    $('#bloodpressureHelp').hide();

    if ($('#date2').val() === '') {
      $('#date2Help').show();
    }
    if ($('#heartrate').val() === '') {
      $('#heartrateHelp').show();
    }
    if ($('#bloodpressure').val() === '') {
      $('#bloodpressureHelp').show();
    }

    if (
      $('#date2').val() === '' ||
      $('#heartrate').val() === '' ||
      $('#bloodpressure').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: this.userID,
      date: $('#date2').val(),
      heartrate: Number($('#heartrate').val()),
      bloodpressure: Number($('#bloodpressure').val()),
    };
    this.serviceService.AddHealth(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit1 = false;
        this.openSnackBar('Add Health Detail Successfully');
        this.GetHealth();
        this.handleClear2();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEdit2() {
    $('#date2Help').hide();
    $('#heartrateHelp').hide();
    $('#bloodpressureHelp').hide();

    if ($('#date2').val() === '') {
      $('#date2Help').show();
    }
    if ($('#heartrate').val() === '') {
      $('#heartrateHelp').show();
    }
    if ($('#bloodpressure').val() === '') {
      $('#bloodpressureHelp').show();
    }

    if (
      $('#date2').val() === '' ||
      $('#heartrate').val() === '' ||
      $('#bloodpressure').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.ID2,
      userId: this.userID,
      date: $('#date2').val(),
      heartrate: Number($('#heartrate').val()),
      bloodpressure: Number($('#bloodpressure').val()),
    };

    this.serviceService.UpdateHealth(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit2 = false;
        this.openSnackBar('Update Health Detail Successfully');
        this.GetHealth();
        this.handleClear2();
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

  handleClear1() {
    this.IsEdit1 = false;
    $('#date1').val('');
    $('#weight').val('');
    $('#calories').val('');
  }

  handleClear2() {
    this.IsEdit2 = false;
    $('#date2').val('');
    $('#heartrate').val('');
    $('#bloodpressure').val('');
  }

  handleCopy1(data: any) {
    this.ID1 = data.id;
    $('#date1').val(data.date);
    $('#weight').val(Number(data.weight));
    $('#calories').val(Number(data.caleries));
    this.IsEdit1 = true;
  }

  handleDelete1(Id: any) {
    this.serviceService.DeletePerformProgress(Id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit2 = false;
        this.openSnackBar('Delete Health Detail Successfully');
        this.GetPerformProgress();
        this.handleClear1();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleCopy2(data: any) {
    this.ID2 = data.id;
    $('#date2').val(data.date);
    $('#heartrate').val(data.heartrate);
    $('#bloodpressure').val(data.bloodpressure);
    this.IsEdit2 = true;
  }

  handleDelete2(Id: any) {
    this.serviceService.DeleteHealth(Id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit2 = false;
        this.openSnackBar('Delete Health Detail Successfully');
        this.GetHealth();
        this.handleClear2();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleGraph1() {
    this.router.navigate(['/userdashboard/graphanalysis']);
  }

  handleGraph2() {
    this.router.navigate(['/userdashboard/healthgraphanalysis']);
  }
}
