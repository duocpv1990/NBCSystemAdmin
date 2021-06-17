import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseApiService } from "./base-api.service";

@Injectable({
    providedIn: 'root',
})
export class DistributorService extends BaseApiService<any> {
    constructor(http: HttpClient) {
        super(http, '');
    }

    getDistributors(pageNumber, pageSize, name, provinceId) {
        return this.http.get(`api/distributor?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&provinceId=${provinceId}`).pipe(map((res: any) => res));
    }

}
