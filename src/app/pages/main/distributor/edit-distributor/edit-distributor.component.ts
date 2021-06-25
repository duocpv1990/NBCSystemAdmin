import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicInputModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { combineLatest, merge } from 'rxjs';
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

  formModel = [];
  listDistrict = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditDistributorComponent>,
    private locationService: LocationService,
    private distributorService: DistributorService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    this.listCreate = this.conFig.create;

    this.getDistributor();
    this.getNations();
    this.getProvinces();
    this.getCompanies();
  }

  getDistributor() {
    console.log(this.data);
    // this.formModel.valueUpdates
    this.distributorService
      .getDistributor(this.data.DistributorId)
      .subscribe((res) => {
        this.dataModel = res;
        this.dataModel.listMedia = res.DistributorMedias;
        combineLatest([
          this.distributorService.getProvince(),
          this.getCompanies(),
        ]).subscribe(([province, companies]) => {
          console.log(province, companies);
          let a = (province as any).payload.map((b) => ({
            value: b.ProvinceId,
            label: b.Name,
          }));

          let b = (companies as any).payload.map((c) => ({
            value: c.CompanyId,
            label: c.Name,
          }));

          this.formModel = [
            new DynamicSelectModel({
              id: 'CompanyId',
              label: 'Công ty',
              value: this.dataModel.CompanyId,
              options: [...b],
            }),
            new DynamicInputModel({
              id: 'Name',
              label: 'Tên nhà phân phối',
              value: this.dataModel.Name,
            }),
            new DynamicInputModel({
              id: 'TaxCode',
              label: 'Mã số thuế',
              value: this.dataModel.TaxCode,
            }),

            new DynamicInputModel({
              id: 'PhoneNumber',
              label: 'Số điện thoại',
              value: this.dataModel.PhoneNumber,
            }),
            new DynamicInputModel({
              id: 'Email',
              label: 'Email',
              value: this.dataModel.Email,
            }),
            new DynamicInputModel({
              id: 'Website',
              label: 'Website',
              value: this.dataModel.Website,
            }),
            new DynamicSelectModel({
              id: 'NationId',
              label: 'Quốc gia',
              value: '916',
              options: [
                {
                  value: '916',
                  label: 'Việt nam',
                },
                // ...a,
              ],
            }),
            new DynamicInputModel({
              id: 'AddressDetail',
              label: 'Địa chỉ',
              value: this.dataModel.AddressDetail,
            }),
            new DynamicSelectModel({
              id: 'ProvinceId',
              label: 'Thành phố/Tỉnh',
              value: this.dataModel.ProvinceId,
              options: [...a],
            }),
          ];
        });
      });
  }

  getCompanies() {
    return this.companyService.getCompanies({
      name: '',
      companyCode: '',
      status: '',
      type: '',
      pageNumber: 1,
      pageSize: 1000,
    });
    // .subscribe((res: any) => {
    //   this.companies = res.payload;
    //   this.listCreate[0].data = this.companies.map((company) => {
    //     return {
    //       name: company.Name,
    //       value: company.CompanyId,
    //     };
    //   });
    // });
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

  getDistricts(id) {
    this.locationService.getDistrict(id).subscribe((res) => {
      this.districts = res;
      this.listDistrict = res.map((district) => {
        return {
          Name: district.Name,
          Value: district.DistrictId,
        };
      });
      // this.listCreate[5].data = this.districts.map((district) => {
      //   return {
      //     name: district.Name,
      //     value: district.DistrictId,
      //   };
      // });
    });
  }

  handleCallbackEvent = (event) => {
    if (event.check === 'Province') {
      this.provinceId = event.value;
      this.getDistricts(this.provinceId);
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
