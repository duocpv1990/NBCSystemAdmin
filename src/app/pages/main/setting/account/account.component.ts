import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { Account } from 'src/app/models/account.model';
import { AccountAddComponent } from './account-add/account-add.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { AccountUpdateComponent } from './account-update/account-update.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  listFilter;
  config = new Account();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  data = [
    {
      Name: 'Vũ Đức Thái',
      UserName: 'thaivu',
      PhoneNumber: '0325641234',
      Email: 'thaivu@ci.com',
      Privileges: 'Leader Sale Admin',
      CreatePerson: 'admin',
      CreateDate: '18/06/2021',
      status: 'Hoạt động'
    },

  ];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
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
      return this.dialog.open(AccountAddComponent, {
        width: '940px',
        height: '588px'
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
      return this.dialog.open(AccountUpdateComponent, {
        width: '940px',
        height: '588px',
        data: ev.item
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'delete') {
      return this.dialog.open(AccountDeleteComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item,
          title: "Xoá Tài khoản",
          content: "Bạn có muốn xoá Tài khoản trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
      });
    }
  }

}
