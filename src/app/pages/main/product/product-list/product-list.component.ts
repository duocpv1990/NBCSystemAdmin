import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { ProductService } from 'src/app/services/product.service';
import {
  DynamicFormGroupModel,
  DynamicInputModel,
  DynamicSelectModel,
} from '@ng-dynamic-forms/core';
import { from } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  listFilter;
  config = new Product();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  data = [
    {
      MediaURL:
        'https://nbc-files.s3.ap-southeast-1.amazonaws.com/hinh-anh-hinh-nen-quyen-sach-dep-nhat-35-74869fa6-30d7-4c92-8e81-8f79a4fc5233.png',
      Name: 'Máy quét ',
      Price: 1200000,
      ProductCode: 'SPMSMVGTIN111',
      ProductId: 54,
      RatingNumber: 0,
      ScanNumber: 0,
      Status: 1,
      Type: 1,
    },
  ];

  formModel = [
    new DynamicInputModel({
      id: 'productCode',
      label: 'Mã sản phẩm',
    }),
    new DynamicInputModel({
      id: 'name',
      label: 'Tên sản phẩm',
    }),
    new DynamicInputModel({
      id: 'companyName',
      label: 'Công ty sở hữu',
    }),
    new DynamicSelectModel({
      id: 'authorize',
      label: 'Quyền quản lý',
      value: '1',
      options: [
        {
          value: '1',
          label: 'Tất cả',
        },
      ],
    }),
    new DynamicSelectModel({
      id: 'status',
      label: 'Trạng thái',
      value: '1',
      options: [
        {
          value: '1',
          label: 'Tất cả',
        },
      ],
    }),
    new DynamicSelectModel({
      id: 'type',
      label: 'Trạng thái thông tin',
      value: '1',
      options: [
        {
          value: '1',
          label: 'Tất cả',
        },
      ],
    }),
  ];
  pageNum = 1;
  pageSize = 10;
  configHeader = [
    { key: 'index', label: 'STT' },
    {
      key: 'MediaURL',
      label: 'Ảnh',
    },
    {
      key: 'Status',
      label: 'Tình trạng',
    },
    {
      key: 'ScanNumber',
      label: 'Lượt quét',
    },
    {
      key: 'RatingNumber',
      label: 'Lượt đánh giá',
    },
    {
      key: 'ProductCode',
      label: 'Mã sản phẩm',
    },
    {
      key: 'Price',
      label: 'Giá',
    },
    {
      key: 'Name',
      label: 'Tên sản phẩm',
    },
    {
      key: 'Type',
      label: 'Trạng thái quét',
    },
  ];
  pagination = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: null,
    id: 'product',
  };
  filter = {
    name: '',
    companyName: '',
    productCode: '',
    type: '',
    status: '',
    authorize: '',
    pageNumber: 1,
    pageSize: 10,
  };
  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    // this.dataSub = this.data;
  }

  changePage(ev) {
    this.filter.pageNumber = ev;
    this.getProductList(this.filter);
  }

  getProductList(filter = this.filter) {
    delete filter.authorize;
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

    this.productService.getAllProduct(this.filter).subscribe((res: any) => {
      this.dataSub = res.payload;
      this.pagination = {
        itemsPerPage: this.filter.pageSize,
        currentPage: this.filter.pageNumber,
        totalItems: res.count,
        id: 'product',
      };
    });
  }

  handleCallback(ev) {
    const filter = this.listFilter.filter((x) => x.value);
    if (!filter.length) return (this.dataSub = this.data);
    filter.forEach((x, ix) => {
      if (ix === 0) {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.data.filter(
            (a) =>
              a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1
          );
        } else {
          this.dataSub = this.data.filter((a) => a[x.condition] == x.value);
        }
      } else {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.dataSub.filter(
            (a) =>
              a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1
          );
        } else {
          this.dataSub = this.dataSub.filter((a) => a[x.condition] == x.value);
        }
      }
    });
  }

  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog
        .open(ProductAddComponent, {
          width: '940px',
          height: '843px',
        })
        .afterClosed()
        .subscribe((result) => {});
    }
    if (ev.type === 'import') {
      return this.dialog
        .open(ImportExcelComponent, {
          width: '500px',
          height: '350px',
        })
        .afterClosed()
        .subscribe((result) => {});
    }
    if (ev.type === 'edit') {
      return this.dialog
        .open(ProductUpdateComponent, {
          width: '940px',
          height: '843px',
          data: ev.data,
        })
        .afterClosed()
        .subscribe((result) => {});
    }
    if (ev.type === 'delete') {
      from(ev.dataDelete)
        .pipe(
          filter((res: any) => res.isChecked === true),
          concatMap((res) => this.productService.deleteProduct(res.ProductId))
        )
        .subscribe(() => {
          this.getProductList();
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
