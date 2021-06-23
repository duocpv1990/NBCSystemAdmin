import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseApiService } from "./base-api.service";

@Injectable({
    providedIn: 'root',
})
export class PrivilegeService extends BaseApiService<any> {
    constructor(http: HttpClient) {
        super(http, 'role');
    }

    getRoles(pageNumber, pageSize, createdDate, updatedBy, createdBy, name) {
        return this.http.get(`role?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&createdDate=${createdDate}&updatedBy=${updatedBy}&createdBy=${createdBy}`).pipe(map((res: any) => res));
    }

    updateRole(roleId, data) {
        return this.http.put(`role?roleId=${roleId}`, data);
    }

    deleteRole(roleId) {
        return this.http.delete(`role?roleId=${roleId}`);
    }

    getRolePolicy(roleId) {
        return this.http.get(`role/policy?roleId=${roleId}`).pipe(map((res: any) => res.payload));
    }

}
