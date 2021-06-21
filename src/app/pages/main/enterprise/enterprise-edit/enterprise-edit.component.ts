import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { CompanyService } from 'src/app/services/company.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
    selector: 'app-enterprise-edit',
    templateUrl: './enterprise-edit.component.html',
    styleUrls: ['./enterprise-edit.component.scss']
})
export class EnterpriseEditComponent implements OnInit {
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
    nations = [];
    provinces = [];
    districts = [];
    nationId = 916;
    provinceId = 1;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<EnterpriseEditComponent>,
        private companyService: CompanyService,
        private locationService: LocationService
    ) { }


    ngOnInit(): void {
        this.listCreate = this.conFig.create;
        this.getCompany();
        this.getNations();
        this.getProvinces();
    }

    getCompany() {
        this.companyService.getCompany(this.data.CompanyId).subscribe(res => {
            this.dataModel = res;
            console.log('company', this.dataModel);

        });
    }

    getNations() {
        this.locationService.list().subscribe(res => {
            this.nations = res.reverse();
            this.listCreate[4].data = this.nations.map(nation => {
                return {
                    name: nation.Name,
                    value: nation.NationId
                }
            })
        });
    }

    getProvinces() {
        this.locationService.getProvince(this.nationId).subscribe(res => {
            this.provinces = res;
            this.listCreate[5].data = this.provinces.map(province => {
                return {
                    name: province.Name,
                    value: province.ProvinceId
                }
            }
            );
        })
    }

    getDistricts() {
        this.locationService.getDistrict(this.provinceId).subscribe(res => {
            this.districts = res;
            this.listCreate[6].data = this.districts.map(district => {
                return {
                    name: district.Name,
                    value: district.DistrictId
                }
            })
        })
    }

    handleCallbackEvent = (event) => {
        console.log(event);
        if (event.check === 'Province') {
            this.provinceId = event.value;
            this.getDistricts();
        }
        switch (event.class) {
            case 'btn-cancel':
                this.cancel();
                break;
            case 'btn-save':
                this.save(event.data)
                break;
            default:
                break;
        }
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
