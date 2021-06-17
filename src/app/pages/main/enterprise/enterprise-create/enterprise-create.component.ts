import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
    selector: 'app-enterprise-create',
    templateUrl: './enterprise-create.component.html',
    styleUrls: ['./enterprise-create.component.scss']
})
export class EnterpriseCreateComponent implements OnInit {
    conFig = new EnterPriseModel;
    dataModel = {};
    option = {
        title: 'Thêm mới doanh nghiệp',
        type: 'create'
    };

    arrayButton = [{
        class: 'btn-cancel',
        text: 'Hủy bỏ'
    },
    {
        class: 'btn-save',
        text: 'Lưu'
    }];
    listCreate = [];

    constructor(
        private dialogRef: MatDialogRef<EnterpriseCreateComponent>,
        private companyService: CompanyService
    ) { }


    ngOnInit(): void {
        this.listCreate = this.conFig.create;
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
        this.companyService.create(this.dataModel).subscribe(res => {

        })
    }

}
