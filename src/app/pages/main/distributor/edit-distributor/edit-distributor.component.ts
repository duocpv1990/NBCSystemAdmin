import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistributorModel } from 'src/app/models/distributor.model';
import { CompanyService } from 'src/app/services/company.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-edit-distributor',
  templateUrl: './edit-distributor.component.html',
  styleUrls: ['./edit-distributor.component.scss'],
})
export class EditDistributorComponent implements OnInit {
  conFig = new DistributorModel();
  dataModel: any = {};
  option = {
    title: 'Thông tin nhà phân phối',
    type: 'edit',
  };

  arrayButton = [
    {
      class: 'btn-cancel',
      text: 'Hủy bỏ',
    },
    {
      class: 'btn-save',
      text: 'Lưu',
    },
  ];
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
    private dialogRef: MatDialogRef<EditDistributorComponent>,
    private locationService: LocationService,
    private distributorService: DistributorService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
    this.getDistributor();
    this.getNations();
    this.getProvinces();
    this.getCompanies();
  }

  getDistributor() {
    this.distributorService
      .getDistributor(this.data.DistributorId)
      .subscribe((res) => {
        this.dataModel = res;
        this.dataModel.listMedia = res.DistributorMedias;
      });
  }

  getCompanies() {
    this.companyService
      .getCompanies(
        this.pageNumber,
        this.pageSize,
        this.companyCode,
        this.name,
        this.status
      )
      .subscribe((res) => {
        this.companies = res.payload;
        this.listCreate[0].data = this.companies.map((company) => {
          return {
            name: company.Name,
            value: company.CompanyId,
          };
        });
      });
  }

  getNations() {
    this.locationService.list().subscribe((res) => {
      this.nations = res.reverse();
      this.listCreate[3].data = this.nations.map((nation) => {
        return {
          name: nation.Name,
          value: nation.NationId,
        };
      });
    });
  }

  getProvinces() {
    this.locationService.getProvince(this.nationId).subscribe((res) => {
      this.provinces = res;
      this.listCreate[4].data = this.provinces.map((province) => {
        return {
          name: province.Name,
          value: province.ProvinceId,
        };
      });
    });
  }

  getDistricts() {
    this.locationService.getDistrict(this.provinceId).subscribe((res) => {
      this.districts = res;
      this.listCreate[5].data = this.districts.map((district) => {
        return {
          name: district.Name,
          value: district.DistrictId,
        };
      });
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
        this.save(event.data);
        break;
      default:
        break;
    }
  };

  cancel = () => {
    this.dialogRef.close();
  };

  save = (value) => {
    console.log('edit distri', value);

    this.dataModel = value;
    this.distributorService
      .updateDistributor(this.data.DistributorId, this.dataModel)
      .subscribe((res) => {
        this.dialogRef.close();
      });
  };
}
