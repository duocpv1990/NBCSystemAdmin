import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistributorModel } from 'src/app/models/distributor.model';
import { DistributorService } from 'src/app/services/distributor.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-edit-distributor',
  templateUrl: './edit-distributor.component.html',
  styleUrls: ['./edit-distributor.component.scss']
})
export class EditDistributorComponent implements OnInit {
  conFig = new DistributorModel;
  dataModel = {};
  option = {
    title: 'Thông tin nhà phân phối',
    type: 'edit'
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
  distributor

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditDistributorComponent>,
    private locationService: LocationService,
    private distributorService: DistributorService
  ) { }

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
    this.getDistributor();
    this.getNations();
    this.getProvinces();
  }

  getDistributor() {
    this.distributorService.getDistributor(this.data.DistributorId).subscribe(res => {
      this.dataModel = res;
      console.log('Distributor', this.dataModel);

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
    this.distributorService.updateDistributor(this.data.DistributorId, this.dataModel).subscribe(res => {
      this.dialogRef.close();
    })
  }

}
