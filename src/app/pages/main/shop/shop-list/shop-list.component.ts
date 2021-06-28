import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicInputModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { from } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { ShopModel } from 'src/app/models/shop.model';
import { DistributorService } from 'src/app/services/distributor.service';
import { StoreService } from 'src/app/services/store.service';
import { ShopCreateComponent } from '../shop-create/shop-create.component';
import { ShopDeleteComponent } from '../shop-delete/shop-delete.component';
import { ShopEditComponent } from '../shop-edit/shop-edit.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 50;
  stores = [];

  constructor(
    private dialog: MatDialog,
    private distributorService: DistributorService,
    private storeService: StoreService
  ) { }
  config = new ShopModel();
  listFilter = [];

  data = [
    {
      stt: '1',
      code: '023456781',
      name: 'Nhà phân phối số 1',
      status: 'Đã duyệt',
      form: 'online',
      update: '13:30, 21/04/2021',
      MediaURL: 'assets/img/default-avatar.jpg',
      address: 'Hàng Bồ - Hoàn Kiếm - Hà Nội',
      area: 'Ha Noi',
      phone: '0123456789',
      production: '1',
    },
    {
      stt: '2',
      code: '023456781',
      global: '023456781',
      name: 'Nhà phân phối số 1',
      form: 'online',
      status: 'Đã duyệt',
      update: '13:30, 21/04/2021',
      address: 'Hàng Bồ - Hoàn Kiếm - Hà Nội',
      area: 'Ha Noi',
      phone: '0123456789',
      production: '1',
      MediaURL: 'assets/img/default-avatar.jpg',
    },
    {
      stt: '3',
      code: '023456781',
      global: '023456781',
      name: 'Nhà phân phối số 1',
      form: 'online',
      status: 'Đã duyệt',
      update: '13:30, 21/04/2021',
      address: 'Hàng Bồ - Hoàn Kiếm - Hà Nội',
      area: 'Ha Noi',
      phone: '0123456789',
      production: '1',
      MediaURL: 'assets/img/default-avatar.jpg',
    },
    {
      stt: '4',
      code: '023456781',
      global: '023456781',
      name: 'Nhà phân phối số 1',
      form: 'online',
      status: 'Đã duyệt',
      update: '13:30, 21/04/2021',
      address: 'Hàng Bồ - Hoàn Kiếm - Hà Nội',
      area: 'Ha Noi',
      phone: '0123456789',
      production: '1',
      MediaURL: 'assets/img/default-avatar.jpg',
    },
    {
      stt: '5',
      code: '023456781',
      global: '023456781',
      name: 'Nhà phân phối số 1',
      status: 'Đã duyệt',
      form: 'online',
      address: 'Hàng Bồ - Hoàn Kiếm - Hà Nội',
      area: 'Ha Noi',
      phone: '0123456789',
      production: '1',
      update: '13:30, 21/04/2021',
      MediaURL: 'assets/img/default-avatar.jpg',
    },
    {
      stt: '6',
      code: '023456781',
      global: '023456781',
      name: 'Nhà phân phối số 1',
      status: 'Đã duyệt',
      update: '13:30, 21/04/2021',
      form: 'online',
      address: 'Hàng Bồ - Hoàn Kiếm - Hà Nội',
      area: 'Ha Noi',
      phone: '0123456789',
      production: '1',
      MediaURL: 'assets/img/default-avatar.jpg',
    },
  ];
  dataTable;
  listForm = [
    {
      name: 'Cửa hàng online',
      value: '1',
    },
    {
      name: 'Cửa hàng offline',
      value: '2',
    },
  ];
  listActive;

  configHeader = [
    { key: 'index', label: 'STT' },
    {
      key: 'MediaURL',
      label: 'Ảnh',
    },
    {
      key: 'Name',
      label: 'Tên cửa hàng',
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
      key: 'PhoneNumber',
      label: 'Số điện thoại',
    },
    {
      key: 'Type',
      label: 'Hình thức',
    },
  ];
  formModel = [];

  pagination = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: null,
    id: 'store',
  };
  dataSub: any;
  filter = {
    name: '',
    provinceId: '',
    type: '',
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
          id: 'name',
          label: 'Tên cửa hàng',
        }),

        new DynamicInputModel({
          id: 'type',
          label: 'Hình thức',
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
    this.listActive = this.config.btnActice;
    this.listFilter[2].data = this.listForm;
    this.dataTable = this.config.collums;
    this.getStores();
  }

  changePage(ev) {
    this.filter.pageNumber = ev;
    this.getStores(this.filter);
  }

  getStores(filter = this.filter) {
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

    this.storeService.getStores(this.filter).subscribe((res: any) => {
      res.payload.forEach((el) => {
        delete el.District;
        delete el.Nation;
        delete el.CreatedOn;
        delete el.UpdatedOn;
      });
      this.dataSub = res.payload;
      this.pagination = {
        itemsPerPage: this.filter.pageSize,
        currentPage: this.filter.pageNumber,
        totalItems: res.count,
        id: 'store',
      };
      // this.distributors.forEach((item, index) => {
      //   item['index'] = index + 1;
      // });
    });
  }

  handleCallback(ev) { }
  handleCallbackTable(ev) {
    if (ev.type === 'create') {
      return this.dialog
        .open(ShopCreateComponent, {
          width: '940px',
          height: '843px',
        })
        .afterClosed()
        .subscribe((result) => {
          this.getStores();
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
          this.getStores();
        });
    }
    if (ev.type === 'edit') {
      console.log('data', ev);

      return this.dialog
        .open(ShopEditComponent, {
          width: '940px',
          height: '843px',
          data: ev,
        })
        .afterClosed()
        .subscribe((result) => {
          this.getStores();
        });
    }

    if (ev.type === 'update-type') {
      this.storeService
        .updateStore(ev.id, {
          Type: ev.data,
        })
        .subscribe(() => {
          this.getStores();
        });
    }
    if (ev.type === 'delete') {
      from(ev.dataDelete)
        .pipe(
          filter((res: any) => res.isChecked === true),
          concatMap((res) => this.storeService.deleteStore(res.id))
        )
        .subscribe(() => {
          this.getStores();
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
}
