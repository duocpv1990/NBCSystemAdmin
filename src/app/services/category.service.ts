import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseApiService<any> {
  constructor(public http: HttpClient) {
    super(http, 'category');
  }

  getTargetMarket(): Observable<any> {
    return this.http.get('targetmarket');
  }
}
