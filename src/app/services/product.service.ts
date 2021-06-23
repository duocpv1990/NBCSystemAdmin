import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseApiService<any> {
  constructor(public http: HttpClient) {
    super(http, 'product');
  }
}
