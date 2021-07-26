import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { BannerModel } from 'src/app/models/banner.model';
import { ExportService } from 'src/app/services/export.service';
import { BannerDeleteComponent } from '../banner-delete/banner-delete.component';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  config = new BannerModel;
  listFilter;
  dataTable;
  listActive;
  dataSub;
  banners = [
    {
      Name: 'Banner 1',
      Index: 1,
      Position: 'Vị trí 1',
      CreatedName: 'Admin',
      StartDate: '2021-07-05T14:48:00.000Z',
      EndDate: '2021-07-07T14:48:00.000Z',
      EditName: 'Admin',
      Type: 1
    },
    {
      Name: 'Banner 2',
      Index: 2,
      Position: 'Vị trí 2',
      CreatedName: 'Admin',
      StartDate: '2021-07-05T14:48:00.000Z',
      EndDate: '2021-07-07T14:48:00.000Z',
      EditName: 'Admin',
      Type: 1
    }
  ];

  constructor(
    private dialog: MatDialog,
    private exportService: ExportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = [];
  }

  handleFilterCallback(ev) {
  }


  exportExcel() {
    this.exportService.exportExcel(this.banners, 'banners');
  }

  handleCallbackTable(ev) {
    console.log(ev);
    switch (ev.type) {
      case 'create':
        this.router.navigate(['setting/banner/create']);
        break;
      case 'import':
        this.dialog.open(ImportExcelComponent, {
          width: '500px',
          height: '350px'
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'edit':
        this.router.navigate(['setting/banner/update'])
        break;
      case 'delete':
        this.dialog.open(BannerDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.item,
            title: "Xoá banner",
            content: "Bạn có muốn xoá banner trên hệ thống?"
          }
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'export':
        this.exportExcel();
        break;

    }
  }

}
