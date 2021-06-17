import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangeModel } from '../models/auth/change.model';
import { BaseApiService } from './base-api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseApiService<any> {
  constructor(http: HttpClient) {
    super(http, '');
  }

  login = (params) => {
    return this.http.post(`api/cognito/login`, params);
  };

  changePassword = (params: ChangeModel) => {
    return this.http.post(``, params,);
  }
}
