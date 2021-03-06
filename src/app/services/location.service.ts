import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseApiService } from "./base-api.service";

@Injectable({
    providedIn: 'root',
})
export class LocationService extends BaseApiService<any> {
    constructor(http: HttpClient) {
        super(http, 'nation');
    }

    getProvince(nationId) {
        return this.http.get(`province?nationId=${nationId}`).pipe(map((res: any) => res.payload));
    }

    getDistrict(provinceId) {
        return this.http.get(`district?provinceId=${provinceId}`).pipe(map((res: any) => res.payload));
    }

}
