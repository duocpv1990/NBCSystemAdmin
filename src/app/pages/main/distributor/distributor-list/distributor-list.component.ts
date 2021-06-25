import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { DistributorModel } from 'src/app/models/distributor.model';
import { DistributorService } from 'src/app/services/distributor.service';
import { CreateDistributorComponent } from '../create-distributor/create-distributor.component';
import { EditDistributorComponent } from '../edit-distributor/edit-distributor.component';
import { DeleteDistributorComponent } from '../delete-distributor/delete-distributor.component';
import { from } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';
import { ProductAddComponent } from '../../product/product-add/product-add.component';
import { ProductUpdateComponent } from '../../product/product-update/product-update.component';
import { DynamicInputModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.scss'],
})
export class DistributorListComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private distributorService: DistributorService
  ) {}
  config = new DistributorModel();
  listFilter = [];

  dataTable;
  listActive;
  dataSub;
  distributors = [];
  pageNumber = 1;
  pageSize = 50;
  provinceId = '';
  name = '';
  count: number;
  AddressDetail: 'haf Noi';
  DistributorId: 104;
  District: 'Huyện Phú Tân';
  MediaURL: 'https://nbc-files.s3.ap-southeast-1.amazonaws.com/hinh-anh-hinh-nen-quyen-sach-dep-nhat-11-31d92048-f191-426f-946f-f3743b03dd05.jpg';
  Name: 'Nhaf phan phoi mien bac';
  Nation: 'Viet Nam';
  PhoneNumber: '1234567890';
  ProductNumber: 0;
  Province: 'Tỉnh An Giang\r\n';
  TaxCode: '123';
  Type: 1;
  UpdatedOn: null;
  configHeader = [
    { key: 'index', label: 'STT' },
    {
      key: 'MediaURL',
      label: 'Ảnh',
    },
    {
      key: 'Name',
      label: 'Nhà phân phối',
    },
    {
      key: 'AddressDetail',
      label: 'Địa chỉ',
    },
    {
      key: 'Province',
      label: 'Khu vực',
    },
    {
      key: 'TaxCode',
      label: 'Mã số thuế',
    },
    {
      key: 'PhoneNumber',
      label: 'Số điện thoại',
    },
    {
      key: 'ProductNumber',
      label: 'Số lượng sản phẩm',
    },
    {
      key: 'UpdatedOn',
      label: 'Thời gian cập nhật',
    },
    {
      key: 'Type',
      label: 'Trạng thái',
    },
  ];
  formModel = [];

  pagination = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: null,
    id: 'distributor',
  };

  filter = {
    name: '',
    provinceId: '',
    companyName: '',
    pageNumber: 1,
    pageSize: 10,
  };

  ngOnInit(): void {
    this.distributorService.getProvince().subscribe((res: any) => {
      let a = res.payload.map((b) => ({
        value: b.ProvinceId,
        label: b.Name,
      }));
      this.formModel = [
        new DynamicInputModel({
          id: 'taxCode',
          label: 'Mã số thuế',
        }),
        new DynamicInputModel({
          id: 'name',
          label: 'Tên nhà phân phối',
        }),
        new DynamicInputModel({
          id: 'companyName',
          label: 'Công ty sở hữu',
        }),
        new DynamicSelectModel({
          id: 'provinceId',
          label: 'Khu vực',
          value: '',
          options: [
            {
              value: '',
              label: 'Tất cả',
            },
            ...a,
          ],
        }),
      ];
    });
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.getDistributor();
  }

  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog
        .open(CreateDistributorComponent, {
          width: '940px',
          height: '843px',
        })
        .afterClosed()
        .subscribe((result) => {
          this.getDistributor();
        });
    }
    if (ev.type === 'edit') {
      return this.dialog
        .open(EditDistributorComponent, {
          width: '940px',
          height: '843px',
          data: ev.item,
        })
        .afterClosed()
        .subscribe((result) => {
          this.getDistributor();
        });
    }
    if (ev.type === 'import') {
      return this.dialog
        .open(ImportExcelComponent, {
          width: '500px',
          height: '350px',
        })
        .afterClosed()
        .subscribe((result) => {
          this.getDistributor();
        });
    }
    if (ev.type === 'update-type') {
      this.distributorService
        .updateDistributor(
          {
            Type: ev.data,
          },
          ev.id
        )
        .subscribe(() => {
          this.getDistributor();
        });
    }
    if (ev.type === 'delete') {
      from(ev.dataDelete)
        .pipe(
          filter((res: any) => res.isChecked === true),
          concatMap((res) =>
            this.distributorService.deleteDistributor(res.DistributorId)
          )
        )
        .subscribe(() => {
          this.getDistributor();
        });
      // return this.dialog
      //   .open(ProductDeleteComponent, {
      //     width: '400px',
      //     height: '250px',
      //     data: {
      //       item: ev.item,
      //       title: 'Xoá sản phẩm',
      //       content: 'Bạn có muốn xoá sản phẩm trên hệ thống?',
      //     },
      //   })
      //   .afterClosed()
      //   .subscribe((result) => {});
    }
  }

  changePage(ev) {
    this.filter.pageNumber = ev;
    this.getDistributor(this.filter);
  }

  getDistributor(filter = this.filter) {
    // delete filter.authorize;
    for (var propName in filter) {
      if (filter[propName] === null || filter[propName] === undefined) {
        filter[propName] = '';
      }
    }

    if (!filter.pageNumber) {
      filter.pageNumber = this.filter.pageNumber;
    }

    if (!filter.pageSize) {
      filter.pageSize = this.filter.pageSize;
    }

    this.filter = filter;
    console.log(this.filter);

    this.distributorService
      .getAllDistributor(this.filter)
      .subscribe((res: any) => {
        res.payload.forEach((el) => {
          delete el.District;
          delete el.Nation;
        });
        this.dataSub = res.payload;
        this.pagination = {
          itemsPerPage: this.filter.pageSize,
          currentPage: this.filter.pageNumber,
          totalItems: res.count,
          id: 'product',
        };
        // this.distributors.forEach((item, index) => {
        //   item['index'] = index + 1;
        // });
      });
  }
}
