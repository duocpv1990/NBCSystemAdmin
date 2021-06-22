import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseApiService } from "./base-api.service";

@Injectable({
    providedIn: 'root',
})
export class StoreService extends BaseApiService<any> {
    constructor(http: HttpClient) {
        super(http, 'store');
    }

    getStores(pageNumber, pageSize) {
        return this.http.get(`store?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map((res: any) => res));
    }

}
