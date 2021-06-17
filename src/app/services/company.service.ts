import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseApiService } from "./base-api.service";

@Injectable({
    providedIn: 'root',
})
export class CompanyService extends BaseApiService<any> {
    constructor(http: HttpClient) {
        super(http, 'api/company');
    }

    getCompanies(pageNumber, pageSize, companyCode, name, status) {
        return this.http.get(`api/company?pageNumber=${pageNumber}&pageSize=${pageSize}&companyCode=${companyCode}&name=${name}&status=${status}`).pipe(map((res: any) => res));
    }

    deleteCompany(companyId) {
        return this.http.delete(`api/company?companyId=${companyId}`);
    }

    getCompany(companyId) {
        return this.http.get(`api/company/detail?companyId=${companyId}`).pipe(map((res: any) => res.payload));
    }

    updateCompany(companyId, data) {
        return this.http.put(`api/company?companyId=${companyId}`, data);
    }

}
