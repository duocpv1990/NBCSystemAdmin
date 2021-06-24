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

  getAllProduct(params) {
    return this.http.get('product', { params });
  }

  updateProduct(product, id) {
    return this.http.put('product', product, {
      params: {
        productId: id,
      },
    });
  }
  postProductCert(data) {
    return this.http.post('product/certificate', data);
  }
  deleteProduct(id) {
    return this.http.delete('product', {
      params: {
        productId: id,
      },
    });
  }
}
