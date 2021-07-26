import { Component, OnInit } from '@angular/core';
import { OutstandingEnterpriseModel } from 'src/app/models/outstanding-enterprise.model';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { ExportService } from 'src/app/services/export.service';
import { OutstandingEnterpriseCreateComponent } from './outstanding-enterprise-create/outstanding-enterprise-create.component';
import { OutstandingEnterpriseUpdateComponent } from './outstanding-enterprise-update/outstanding-enterprise-update.component';
import { OutstandingEnterpriseDeleteComponent } from './outstanding-enterprise-delete/outstanding-enterprise-delete.component';

@Component({
  selector: 'app-outstanding-enterprise',
  templateUrl: './outstanding-enterprise.component.html',
  styleUrls: ['./outstanding-enterprise.component.scss']
})
export class OutstandingEnterpriseComponent implements OnInit {
  config = new OutstandingEnterpriseModel;
  listFilter;
  dataTable;
  listActive;
  dataSub;
  enterprises = [
    {
      Name: 'Công ty TNHH Việt An',
      Index: 1,
      CreatedName: 'Admin',
      StartDate: '2021-07-05T14:48:00.000Z',
      EndDate: '2021-07-07T14:48:00.000Z',
      EditName: 'Admin',
      Type: 1
    },
    {
      Name: 'Công ty TNHH Tâm An',
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
  handleFilterCallback(event) {
    console.log(event);
  }

  handleCallbackTable(ev) {
    console.log(ev);
    switch (ev.type) {
      case 'create':
        this.dialog.open(OutstandingEnterpriseCreateComponent, {
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
        this.dialog.open(OutstandingEnterpriseUpdateComponent, {
          width: '600px',
          height: '500px',
          data: ev.item
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'delete':
        this.dialog.open(OutstandingEnterpriseDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.item,
            title: "Xoá doanh nghiệp nổi bật",
            content: "Bạn có muốn xoá doanh nghiệp nổi bật trên hệ thống?"
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
    this.exportService.exportExcel(this.enterprises, 'enterprises')
  }

}
