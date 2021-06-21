import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { CompanyService } from 'src/app/services/company.service';
import { LocationService } from 'src/app/services/location.service';

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
    nations = [];
    provinces = [];
    districts = [];
    nationId = 916;
    provinceId = 1;
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
        private companyService: CompanyService,
        private locationService: LocationService
    ) { }


    ngOnInit(): void {
        this.listCreate = this.conFig.create;
        this.getNations();
        this.getProvinces();
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
        this.dialogRef.close();
    }

    save = (value) => {
        this.dataModel = value;
        this.companyService.create(this.dataModel).subscribe(res => {
            this.dialogRef.close();
        })
    }

}
