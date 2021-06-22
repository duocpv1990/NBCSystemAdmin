import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShopModel } from 'src/app/models/shop.model';
import { CompanyService } from 'src/app/services/company.service';
import { LocationService } from 'src/app/services/location.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {
  conFig = new ShopModel();
  dataModel = {};
  option = {
    title: 'Thêm mới điểm bán',
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
  companyCode = '';
  name = '';
  status = '';
  pageNumber = 1;
  pageSize = 10;
  companies = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShopEditComponent>,
    private locationService: LocationService,
    private storeService: StoreService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
    this.getStore();
    this.getNations();
    this.getProvinces();
    this.getCompanies();
  }

  getStore() {
    this.storeService.getStore(this.data.StoreId).subscribe(res => {
      this.dataModel = res;
    })
  }

  getCompanies() {
    this.companyService.getCompanies(this.pageNumber, this.pageSize, this.companyCode, this.name, this.status)
      .subscribe((res) => {
        this.companies = res.payload;
        this.listCreate[0].data = this.companies.map(company => {
          return {
            name: company.Name,
            value: company.CompanyId
          }
        })
      });
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
    this.storeService.updateStore(this.data.StoreId, this.dataModel).subscribe(res => {
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
