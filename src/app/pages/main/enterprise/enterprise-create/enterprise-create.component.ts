import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { AccountService } from 'src/app/services/account.service';
import { CompanyService } from 'src/app/services/company.service';
import { LocationService } from 'src/app/services/location.service';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-enterprise-create',
  templateUrl: './enterprise-create.component.html',
  styleUrls: ['./enterprise-create.component.scss'],
})
export class EnterpriseCreateComponent implements OnInit {
  conFig = new EnterPriseModel();
  dataModel = {};
  option = {
    title: 'Thêm mới doanh nghiệp',
    type: 'create',
  };
  nations = [];
  provinces = [];
  districts = [];
  nationId = 916;
  provinceId = 1;
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

  roles = [];
  name = '';
  createdBy = '';
  updatedBy = '';
  createdDate = '';
  pageNumber = 1;
  pageSize = 10;

  constructor(
    private dialogRef: MatDialogRef<EnterpriseCreateComponent>,
    private companyService: CompanyService,
    private locationService: LocationService,
    private privilegeService: PrivilegeService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
    this.getNations();
    this.getProvinces();
    this.getRoles();
  }

  getNations() {
    this.locationService.list().subscribe((res) => {
      this.nations = res.reverse();
      this.listCreate[4].data = this.nations.map((nation) => {
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
      this.listCreate[5].data = this.provinces.map((province) => {
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
      this.listCreate[6].data = this.districts.map((district) => {
        return {
          name: district.Name,
          value: district.DistrictId,
        };
      });
    });
  }

  getRoles() {
    this.privilegeService.getRoles(this.pageNumber, this.pageSize, this.createdDate, this.updatedBy, this.createdBy, this.name).subscribe(res => {
      this.roles = res.payload.reverse();
      this.listCreate[7].data = this.roles.map(role => {
        return {
          name: role.Name,
          value: role.RoleId
        }
      }
      );
    });
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
    this.dataModel = value;
    console.log('model', this.dataModel);
    let accountModel = {
      Username: value.Email,
      Email: value.Email,
      PhoneNumber: value.PhoneNumber,
      FullName: value.Email,
      RoleId: value.RoleId
    }
    this.companyService.create(this.dataModel).subscribe((res) => {
      this.accountService.addAccount(accountModel).subscribe(res => {
        this.dialogRef.close();
      });
    });
  };



}
