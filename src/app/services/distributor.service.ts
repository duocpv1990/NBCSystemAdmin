import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class DistributorService extends BaseApiService<any> {
  constructor(http: HttpClient) {
    super(http, 'distributor');
  }
  getProvince() {
    return this.http.get('province', {
      params: {
        nationId: '916',
      },
    });
  }
  getAllDistributor(params) {
    return this.http.get('distributor', { params });
  }

  getDistributor(distributorId) {
    return this.http
      .get(`distributor/detail?distributorId=${distributorId}`)
      .pipe(map((res: any) => res.payload));
  }

  updateDistributor(product, id) {
    return this.http.put('distributor', product, {
      params: {
        distributorId: id,
      },
    });
  }
  deleteDistributor(distributorId) {
    return this.http.delete(`distributor?distributorId=${distributorId}`);
  }
}
