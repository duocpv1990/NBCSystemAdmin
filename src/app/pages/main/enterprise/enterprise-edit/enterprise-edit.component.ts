import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
    selector: 'app-enterprise-edit',
    templateUrl: './enterprise-edit.component.html',
    styleUrls: ['./enterprise-edit.component.scss']
})
export class EnterpriseEditComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<EnterpriseEditComponent>,
        private companyService: CompanyService
    ) { }
    conFig = new EnterPriseModel;
    dataModel;
    option = {
        title: 'THÔNG TIN DOANH NGHIỆP',
        type: 'edit'
    };

    arrayButton = [{
        class: 'btn-cancel',
        text: 'Hủy bỏ'
    },
    {
        class: 'btn-save',
        text: 'Chỉnh sửa'
    }]
    listCreate = [];

    ngOnInit(): void {
        this.listCreate = this.conFig.create;
        this.getCompany();
    }

    getCompany() {
        this.companyService.getCompany(this.data.CompanyId).subscribe(res => {
            this.dataModel = res;
        });
    }

    handleCallbackEvent = (value) => {
        console.log(value);

        switch (value.class) {
            case 'btn-cancel':
                this.cancel();
                break;
            case 'btn-save':
                this.save(value.data)
                break;
            default:
                break;
        }
        this.dialogRef.close();
    }

    cancel = () => {
    }

    save = (value) => {
        this.dataModel = value;
        this.companyService.updateCompany(this.data.CompanyId, this.dataModel).subscribe(res => {
            this.dialogRef.close();
        })
    }


}
