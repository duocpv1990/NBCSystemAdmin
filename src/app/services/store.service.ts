import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BaseApiService<any> {
  constructor(http: HttpClient) {
    super(http, 'store');
  }

  getStores(params) {
    return this.http
      .get(`store`, {
        params,
      })
      .pipe(map((res: any) => res));
  }

  deleteStore(id) {
    return this.http.delete('store', {
      params: {
        storeId: id,
      },
    });
  }
  getStore(storeId) {
    return this.http
      .get(`store/detail?storeId=${storeId}`)
      .pipe(map((res: any) => res.payload));
  }

  updateStore(storeId, data) {
    return this.http.put(`store?storeId=${storeId}`, data);
  }

  createImgStore(data) {
    return this.http.post("api/store/media", data).pipe(map((res: any) => res.payload));
  }

}
