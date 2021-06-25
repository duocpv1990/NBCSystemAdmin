import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService extends BaseApiService<any> {
    constructor(http: HttpClient) {
        super(http, 'userprofile');
    }

    getAccounts(pageNumber, pageSize, name, status, createdBy, roleId) {
        return this.http
            .get(
                `userprofile?pageNumber=${pageNumber}&pageSize=${pageSize}&createdBy=${createdBy}&name=${name}&status=${status}&roleId=${roleId}`
            )
            .pipe(map((res: any) => res));
    }

    addAccount(data) {
        return this.http.post('cognito/register', data);
    }




}
