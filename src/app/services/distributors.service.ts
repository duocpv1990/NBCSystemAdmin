import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class DistributorsService extends BaseApiService<any> {
  constructor(public http: HttpClient) {
    super(http, 'distributor');
  }

  getDistributorProduct(disId): Observable<any> {
    return this.http.get('store', {
      params: {
        name: '',
        provinceId: '',
        pageSize: '1000',
        pageNumber: '1',
      },
    });
  }
}
