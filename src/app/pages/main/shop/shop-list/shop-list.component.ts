import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { ShopModel } from 'src/app/models/shop.model';
import { StoreService } from 'src/app/services/store.service';
import { ShopCreateComponent } from '../shop-create/shop-create.component';
import { ShopDeleteComponent } from '../shop-delete/shop-delete.component';
import { ShopEditComponent } from '../shop-edit/shop-edit.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  stores = [];

  constructor(
    private dialog: MatDialog,
    private storeService: StoreService
  ) { }
  config = new ShopModel();
  listFilter = [];

  data = [
    {
      "stt": "1",
      "code": "023456781",
      "name": 'Nhà phân phối số 1',
      "status": "Đã duyệt",
      "form": "online",
      "update": "13:30, 21/04/2021",
      "MediaURL": "assets/img/default-avatar.jpg",
      "address": "Hàng Bồ - Hoàn Kiếm - Hà Nội",
      "area": "Ha Noi",
      "phone": "0123456789",
      "production": "1",
    },
    {
      "stt": "2",
      "code": "023456781",
      "global": '023456781',
      "name": 'Nhà phân phối số 1',
      "form": "online",
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "address": "Hàng Bồ - Hoàn Kiếm - Hà Nội",
      "area": "Ha Noi",
      "phone": "0123456789",
      "production": "1",
      "MediaURL": "assets/img/default-avatar.jpg",

    },
    {
      "stt": "3",
      "code": "023456781",
      "global": '023456781',
      "name": 'Nhà phân phối số 1',
      "form": "online",
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "address": "Hàng Bồ - Hoàn Kiếm - Hà Nội",
      "area": "Ha Noi",
      "phone": "0123456789",
      "production": "1",
      "MediaURL": "assets/img/default-avatar.jpg",

    },
    {
      "stt": "4",
      "code": "023456781",
      "global": '023456781',
      "name": 'Nhà phân phối số 1',
      "form": "online",
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "address": "Hàng Bồ - Hoàn Kiếm - Hà Nội",
      "area": "Ha Noi",
      "phone": "0123456789",
      "production": "1",
      "MediaURL": "assets/img/default-avatar.jpg",

    },
    {
      "stt": "5",
      "code": "023456781",
      "global": '023456781',
      "name": 'Nhà phân phối số 1',
      "status": "Đã duyệt",
      "form": "online",
      "address": "Hàng Bồ - Hoàn Kiếm - Hà Nội",
      "area": "Ha Noi",
      "phone": "0123456789",
      "production": "1",
      "update": "13:30, 21/04/2021",
      "MediaURL": "assets/img/default-avatar.jpg",
    },
    {
      "stt": "6",
      "code": "023456781",
      "global": '023456781',
      "name": 'Nhà phân phối số 1',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "form": "online",
      "address": "Hàng Bồ - Hoàn Kiếm - Hà Nội",
      "area": "Ha Noi",
      "phone": "0123456789",
      "production": "1",
      "MediaURL": "assets/img/default-avatar.jpg",
    }];
  dataTable;
  listForm = [
    {
      "name": "Cửa hàng online",
      "value": "1",
    },
    {
      "name": "Cửa hàng offline",
      "value": "2",
    }
  ]
  listActive;


  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.listActive = this.config.btnActice;
    this.listFilter[2].data = this.listForm;
    this.dataTable = this.config.collums;
    this.getStores();
  }

  getStores() {
    this.storeService.getStores(this.pageNumber, this.pageSize).subscribe(res => {
      this.stores = res.payload;
    })
  }

  handleCallback(ev) {

  }
  handleCallbackTable(ev) {
    if (ev.type === 'create') {
      return this.dialog.open(ShopCreateComponent, {
        width: '940px',
        height: '843px'
      }).afterClosed().subscribe(result => {
        this.getStores();
      });
    }
    if (ev.type === 'import') {
      return this.dialog.open(ImportExcelComponent, {
        width: '500px',
        height: '350px'
      }).afterClosed().subscribe(result => {
        this.getStores();
      });
    }
    if (ev.type === 'edit') {
      return this.dialog.open(ShopEditComponent, {
        width: '940px',
        height: '843px',
        data: ev.item
      }).afterClosed().subscribe(result => {
        this.getStores();
      });
    }

    if (ev.type === 'delete') {
      return this.dialog.open(ShopDeleteComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item,
          title: "Xoá điểm bán",
          content: "Bạn có muốn xoá thông tin điểm bán trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
        this.getStores();
      });
    }
  }

}
