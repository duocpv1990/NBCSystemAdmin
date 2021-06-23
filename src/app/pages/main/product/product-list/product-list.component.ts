import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { ProductService } from 'src/app/services/product.service';

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
  
  getProductList(
    filter = {
      name: '',
      companyName: '',
      productCode: '',
      type: '',
      status: '',
      pageNumber: '1',
      pageSize: '10',
    }
  ) {
    this.productService.list(filter).subscribe((res: any) => {
      console.log(res);
      this.dataSub = res;
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
          data: ev.item,
        })
        .afterClosed()
        .subscribe((result) => {});
    }
    if (ev.type === 'delete') {
      return this.dialog
        .open(ProductDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.item,
            title: 'Xoá sản phẩm',
            content: 'Bạn có muốn xoá sản phẩm trên hệ thống?',
          },
        })
        .afterClosed()
        .subscribe((result) => {});
    }
  }
}
