import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { ServicePackage } from 'src/app/models/service-package.model';
import { ServicePackageAddComponent } from '../service-package-add/service-package-add.component';
import { ServicePackageDeleteComponent } from '../service-package-delete/service-package-delete.component';
import { ServicePackageUpdateComponent } from '../service-package-update/service-package-update.component';

@Component({
  selector: 'app-service-package-list',
  templateUrl: './service-package-list.component.html',
  styleUrls: ['./service-package-list.component.scss']
})
export class ServicePackageListComponent implements OnInit {
  listFilter;
  config = new ServicePackage();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  data = [
    {
      servicePackageName: 'Gói MBTT 5 mã',
      createPerson: 'admin',
      createDate: '25-05-2021',
      lastEditDate: '25-05-2021',
      lastEditPerson: 'admin',
      condition: 'Hoạt động',
      status: 'Khóa',
      action: ''
    },
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
    this.listFilter[3].data = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Khóa',
        value: 0
      }
    ];
  }

  handleCallback(ev) {
    const filter = this.listFilter.filter(x => x.value);
    if (!filter.length) return this.dataSub = this.data;
    filter.forEach((x, ix) => {
      if (ix === 0) {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.data.filter(
            (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
        } else {
          this.dataSub = this.data.filter((a) => a[x.condition] == x.value);
        }
      } else {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.dataSub.filter(
            (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
        } else {
          this.dataSub = this.dataSub.filter((a) => a[x.condition] == x.value);
        }
      }

    });

  }

  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog.open(ServicePackageAddComponent, {
        width: '500px',
        height: '600px',
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'import') {
      return this.dialog.open(ImportExcelComponent, {
        width: '500px',
        height: '350px'
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'edit') {
      return this.dialog.open(ServicePackageUpdateComponent, {
        width: '500px',
        height: '600px',
        data: ev.item
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'delete') {
      return this.dialog.open(ServicePackageDeleteComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item,
          title: "Xoá gói dịch vụ",
          content: "Bạn có muốn xoá gói dịch vụ trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
      });
    }
  }

}
