import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DistributorModel } from 'src/app/models/distributor.model';
import { DistributorService } from 'src/app/services/distributor.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
    selector: 'app-create-distributor',
    templateUrl: './create-distributor.component.html',
    styleUrls: ['./create-distributor.component.scss']
})
export class CreateDistributorComponent implements OnInit {
    conFig = new DistributorModel;
    dataModel = {};
    option = {
        title: 'Thêm mới nhà phân phối',
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
        private dialogRef: MatDialogRef<CreateDistributorComponent>,
        private locationService: LocationService,
        private distributorService: DistributorService
    ) { }


    ngOnInit(): void {
        this.listCreate = this.conFig.create;
        this.getNations();
        this.getProvinces();
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
        this.dialogRef.close();
    }

    save = (value) => {
        this.dataModel = value;
        this.distributorService.create(this.dataModel).subscribe(res => {
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
