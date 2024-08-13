import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
import { localStorageSession } from '../shared/localStorage';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Service;

// const _authToken = localStorage.getItem('Admin-Token');

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorage: localStorageSession
  ) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
  });

  multipartheaders = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
  });

  AddProfile(data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddProfile, data, {
      headers: this.multipartheaders,
    });
  }

  UpdateProfile(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateProfile, _data, {
      headers: this.multipartheaders,
    });
  }

  GetProfile(data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetProfile + '?UserId=' + data,
      {
        headers: this.headers,
      }
    );
  }

  //WorkoutDetail

  AddWorkoutDetail(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddWorkoutDetail, _data, {
      headers: this.headers,
    });
  }

  UpdateWorkoutDetail(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateWorkoutDetail, _data, {
      headers: this.headers,
    });
  }

  GetWorkoutDetail(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetWorkoutDetail + '?UserId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeleteWorkoutDetail(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteWorkoutDetail + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  //FitnessGoalDetail

  AddFitnessGoal(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddFitnessGoal, _data, {
      headers: this.headers,
    });
  }

  UpdateFitnessGoal(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateFitnessGoal, _data, {
      headers: this.headers,
    });
  }

  GetFitnessGoal(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetFitnessGoal + '?UserId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeleteFitnessGoal(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteFitnessGoal + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  //PersonalRoutineDetail

  AddPersonalRoutine(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddPersonalRoutine, _data, {
      headers: this.headers,
    });
  }

  UpdatePersonalRoutine(_data: any) {
    return this._httpClient.put(
      _baseUrl + _apiUrl.UpdatePersonalRoutine,
      _data,
      {
        headers: this.headers,
      }
    );
  }

  GetPersonalRoutine(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetPersonalRoutine + '?UserId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeletePersonalRoutine(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeletePersonalRoutine + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  //PerformProgressDetail

  AddPerformProgress(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddPerformProgress, _data, {
      headers: this.headers,
    });
  }

  UpdatePerformProgress(_data: any) {
    return this._httpClient.put(
      _baseUrl + _apiUrl.UpdatePerformProgress,
      _data,
      {
        headers: this.headers,
      }
    );
  }

  GetPerformProgress(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetPerformProgress + '?UserId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeletePerformProgress(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeletePerformProgress + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  //HealthDetail

  AddHealth(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddHealth, _data, {
      headers: this.headers,
    });
  }

  UpdateHealth(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateHealth, _data, {
      headers: this.headers,
    });
  }

  GetHealth(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetHealth + '?UserId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeleteHealth(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteHealth + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  //DietDetail

  AddDiet(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddDiet, _data, {
      headers: this.headers,
    });
  }

  UpdateDiet(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateDiet, _data, {
      headers: this.headers,
    });
  }

  GetDiet(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetDiet + '?UserId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeleteDiet(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteDiet + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }
}
