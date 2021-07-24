import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { ReasonModel } from 'src/app/models/reason.model';
import { ExportService } from 'src/app/services/export.service';
import { ReasonAddComponent } from './reason-add/reason-add.component';
import { ReasonDeleteComponent } from './reason-delete/reason-delete.component';
import { ReasonUpdateComponent } from './reason-update/reason-update.component';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {
  listFilter;
  config = new ReasonModel();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  data = [];
  pageNumber = 1;
  pageSize = 50;
  name = '';
  status = '';
  createdBy = '';
  roleId = '';
  reasons = [
    {
      Name: 'KH không đủ kinh tế',
      ReasonType: 'Hoàn duyệt KH',
      Creater: 'Admin',
      CreatedDate: '24/07/2021',
      LastEditDate: '26/07/2021',
      LastEditer: 'Admin',
      Status: 'Hoạt động',
      Type: 'Khóa'
    }
  ];
  timer;

  constructor(
    private dialog: MatDialog,
    private exportService: ExportService
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
  }

  handleFilterCallback(event) {
    console.log(event);
    if (event.condition === 'Name') {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.name = event.value;

      }, 100);
    }

  }

  exportExcel() {
    this.exportService.exportExcel(this.reasons, 'accounts')
  }

  handleCallbackTable(ev) {
    console.log(ev);
    switch (ev.type) {
      case 'create':
        this.dialog.open(ReasonAddComponent, {
          width: '940px',
          height: '588px'
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
        this.dialog.open(ReasonUpdateComponent, {
          width: '940px',
          height: '588px',
          data: ev.item
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'delete':
        this.dialog.open(ReasonDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.item,
            title: "Xoá lý do",
            content: "Bạn có muốn xoá lý do trên hệ thống?"
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
