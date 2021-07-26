import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { OutstandingProductModel } from 'src/app/models/outstanding-product.model';
import { ExportService } from 'src/app/services/export.service';
import { OutstandingProductCreateComponent } from './outstanding-product-create/outstanding-product-create.component';
import { OutstandingProductDeleteComponent } from './outstanding-product-delete/outstanding-product-delete.component';
import { OutstandingProductUpdateComponent } from './outstanding-product-update/outstanding-product-update.component';

@Component({
  selector: 'app-outstanding-product',
  templateUrl: './outstanding-product.component.html',
  styleUrls: ['./outstanding-product.component.scss']
})
export class OutstandingProductComponent implements OnInit {

  config = new OutstandingProductModel;
  listFilter;
  dataTable;
  listActive;
  dataSub;
  products = [
    {
      Name: 'Cây lau nhà',
      Index: 1,
      CreatedName: 'Admin',
      StartDate: '2021-07-05T14:48:00.000Z',
      EndDate: '2021-07-07T14:48:00.000Z',
      EditName: 'Admin',
      Type: 1
    },
    {
      Name: 'Robot hút bụi',
      Index: 2,
      CreatedName: 'Admin',
      StartDate: '2021-07-05T14:48:00.000Z',
      EndDate: '2021-07-07T14:48:00.000Z',
      EditName: 'Admin',
      Type: 1
    }
  ];


  constructor(
    private dialog: MatDialog,
    private exportService: ExportService
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = [];
  }
  handleFilterCallback(ev) {


  }

  handleCallbackTable(ev) {
    console.log(ev);
    switch (ev.type) {
      case 'create':
        this.dialog.open(OutstandingProductCreateComponent, {
          width: '600px',
          height: '500px'
        }).afterClosed().subscribe(result => {
        });
        break;
      case 'import':
        this.dialog.open(ImportExcelComponent, {
          width: '500px',
          height: '350px'
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'edit':
        this.dialog.open(OutstandingProductUpdateComponent, {
          width: '600px',
          height: '500px',
          data: ev.item
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'delete':
        this.dialog.open(OutstandingProductDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.item,
            title: "Xoá sản phẩm nổi bật",
            content: "Bạn có muốn xoá sản phẩm nổi bật trên hệ thống?"
          }
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'export':
        this.exportExcel();
        break;

    }
  }

  exportExcel() {
    this.exportService.exportExcel(this.products, 'products')
  }

}
