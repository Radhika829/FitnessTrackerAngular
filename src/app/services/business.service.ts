import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
import { localStorageSession } from '../shared/localStorage';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Business;

// const _authToken = localStorage.getItem('Admin-Token');

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
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

  // 'Content-Type', 'text/plain'
  // AddInterviewDetail(_data: any) {
  //   return this._httpClient.post(_baseUrl + _apiUrl.AddInterviewDetail, _data, {
  //     headers: this.multipartheaders,
  //   });
  // }

  // UpdateInterviewDetail(_data: any) {
  //   return this._httpClient.put(
  //     _baseUrl + _apiUrl.UpdateInterviewDetail,
  //     _data,
  //     {
  //       headers: this.multipartheaders,
  //     }
  //   );
  // }

  // GetInterviewList() {
  //   return this._httpClient.get(_baseUrl + _apiUrl.GetInterviewList, {
  //     headers: this.headers,
  //   });
  // }

  // GetInterviewDetail(_data: any) {
  //   return this._httpClient.get(
  //     _baseUrl + _apiUrl.GetInterviewDetail + '?Id=' + _data,
  //     {
  //       headers: this.headers,
  //     }
  //   );
  // }

  // GetProfileList() {
  //   return this._httpClient.get(_baseUrl + _apiUrl.GetProfileList, {
  //     headers: this.headers,
  //   });
  // }

  // GetHRPanelList() {
  //   return this._httpClient.get(_baseUrl + _apiUrl.GetHRPanelList, {
  //     headers: this.headers,
  //   });
  // }

  // GetTechPanelList() {
  //   return this._httpClient.get(_baseUrl + _apiUrl.GetTechPanelList, {
  //     headers: this.headers,
  //   });
  // }

  // AddTheater(_data: any) {
  //   return this._httpClient.post(_baseUrl + _apiUrl.AddTheater, _data, {
  //     headers: this.headers,
  //   });
  // }

  // UpdateTheater(_data: any) {
  //   return this._httpClient.put(_baseUrl + _apiUrl.UpdateTheater, _data, {
  //     headers: this.headers,
  //   });
  // }

  // GetTheater() {
  //   return this._httpClient.get(_baseUrl + _apiUrl.GetTheater, {
  //     headers: this.headers,
  //   });
  // }

  // DeleteTheater(_data: any) {
  //   return this._httpClient.delete(
  //     _baseUrl + _apiUrl.DeleteTheater + '?Id=' + _data,
  //     {
  //       headers: this.headers,
  //     }
  //   );
  // }
}
