import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { ShopModel } from 'src/app/models/shop.model';
import { LocationService } from 'src/app/services/location.service';
import { StoreService } from 'src/app/services/store.service';
import { EnterpriseCreateComponent } from '../../enterprise/enterprise-create/enterprise-create.component';

@Component({
    selector: 'app-shop-create',
    templateUrl: './shop-create.component.html',
    styleUrls: ['./shop-create.component.scss']
})
export class ShopCreateComponent implements OnInit {

    conFig = new ShopModel;
    dataModel = {};
    option = {
        title: 'Thêm mới điểm bán',
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
    nations = [];
    provinces = [];
    districts = [];
    nationId = 916;
    provinceId = 1;

    constructor(
        private dialogRef: MatDialogRef<ShopCreateComponent>,
        private locationService: LocationService,
        private storeService: StoreService
    ) { }


    ngOnInit(): void {
        this.listCreate = this.conFig.create;
        this.getNations();
        this.getProvinces();
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
        this.storeService.create(this.dataModel).subscribe(res => {
            this.dialogRef.close();
        })
    }

    getNations() {
        this.locationService.list().subscribe(res => {
            this.nations = res.reverse();
            this.listCreate[2].data = this.nations.map(nation => {
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
            this.listCreate[3].data = this.provinces.map(province => {
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
            this.listCreate[4].data = this.districts.map(district => {
                return {
                    name: district.Name,
                    value: district.DistrictId
                }
            });
        })
    }



}
