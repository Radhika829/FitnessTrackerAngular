import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Chart from 'chart.js/auto';
//or
// import Chart from 'chart.js';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';
@Component({
  selector: 'app-techhome',
  templateUrl: './healthgraph.component.html',
  styleUrl: './healthgraph.component.css',
})

export class HealthGraphComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  UserID = 0;
  chart: any;
  chart1: any;
  List1: { label: string; y: Number }[] = [];
  List2: any[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private _localStorage: localStorageSession,
    private serviceService: ServiceService
  ) {
    this.UserID = Number(this._localStorage.getItem('User-Id'));
  }

  originalData: any[] = []; // This will store the original data from the API
  filteredData: any[] = []; // This will store the filtered data for the chart

  ngOnInit(): void {
    this.GetHealth();
  }

  GetHealth() {
    let UserID = this._localStorage.getItem('User-Id');
    this.serviceService.GetHealth(UserID).subscribe({
      next: (result: any) => {
        // debugger;
        this.filteredData = result;
        this.createChart1();
      },
      error: (error: any) => {
        this.openSnackBar('Something went wrong');
      },
    });
  }

  createChart1() {
    const fieldName = 'date';
    const fieldName1 = 'heartrate';
    const fieldName2 = 'bloodpressure';
    this.chart1 = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.filteredData.map((item) => item[fieldName]),
        datasets: [
          {
            label: 'Heart rate',
            data: this.filteredData.map((item) => item[fieldName1]),
            backgroundColor: 'blue',
          },
          {
            label: 'Blood Pressure',
            data: this.filteredData.map((item) => item[fieldName2]),
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });

    // this.chart1.destroy();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
