import { Component, OnInit } from '@angular/core';
import { Authorization } from 'src/app/models/authorization.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  config = new Authorization();
  enterpriseDataTable;
  enterpriseData = [
    { Enterprise: 'Thêm doanh nghiệp' },
    { Enterprise: 'Xem thông tin doanh nghiệp' },
    { Enterprise: 'Sửa thông tin doanh nghiệp' },
    { Enterprise: 'Xóa thông tin doanh nghiệp' },
    { Enterprise: 'Duyệt thông tin doanh nghiệp' },
  ];

  distributorDataTable;
  distributorData = [
    { Distributor: 'Thêm nhà phân phối' },
    { Distributor: 'Xem thông tin nhà phân phối' },
    { Distributor: 'Sửa thông tin nhà phân phối' },
    { Distributor: 'Xóa thông tin nhà phân phối' },
    { Distributor: 'Duyệt thông tin nhà phân phối' },
  ];

  productDataTable;
  productData = [
    { Product: 'Thêm sản phẩm' },
    { Product: 'Xem thông tin sản phẩm' },
    { Product: 'Sửa thông tin sản phẩm' },
    { Product: 'Xóa thông tin sản phẩm' },
  ];

  servicePackageDataTable;
  servicePackageData = [
    { ServicePackage: 'Thêm gói dịch vụ' },
    { ServicePackage: 'Xem thông tin gói dịch vụ' },
    { ServicePackage: 'Sửa thông tin gói dịch vụ' },
    { ServicePackage: 'Xóa thông tin gói dịch vụ' },
  ];


  constructor() { }

  ngOnInit(): void {
    this.tableDataInit();
  }

  tableDataInit() {
    this.enterpriseDataTable = this.config.enterpriseCollums;
    this.distributorDataTable = this.config.distributorCollums;
    this.productDataTable = this.config.productCollums;
    this.servicePackageDataTable = this.config.servicePackageCollums;
  }

}
