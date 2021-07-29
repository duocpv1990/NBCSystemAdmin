import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { ExportService } from 'src/app/services/export.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
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
  data = [];
  pageNumber = 1;
  pageSize = 50;
  name = '';
  status = '';
  createdBy = '';
  roleId = '';
  accounts = [];
  timer;
  roles = [];
  updatedBy = '';
  createdDate = '';

  constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
    private exportService: ExportService,
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
    this.getAccounts();
    this.getRoles();
    this.listFilter[3].data = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Khóa',
        value: 0
      }
    ]
  }

  getAccounts() {
    this.accountService.getAccounts(this.pageNumber, this.pageSize, this.name, this.status, this.createdBy, this.roleId).subscribe(res => {
      this.accounts = res.payload.reverse();
    });
  }

  getRoles() {
    this.privilegeService.getRoles(this.pageNumber, this.pageSize, this.createdDate, this.updatedBy, this.createdBy, this.name).subscribe(res => {
      this.roles = res.payload.reverse();
      this.listFilter[2].data = this.roles.map(role => {
        return {
          name: role.Name,
          value: role.RoleId
        }
      })
    });
  }

  handleFilterCallback(event) {
    console.log(event);
    if (event.condition === 'Name') {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.name = event.value;
        this.getAccounts();
      }, 100);
    }

  }

  exportExcel() {
    this.exportService.exportExcel(this.accounts, 'accounts')
  }

  handleCallbackTable(ev) {
    console.log(ev);
    switch (ev.type) {
      case 'create':
        this.dialog.open(AccountAddComponent, {
          width: '940px',
          height: '588px'
        }).afterClosed().subscribe(result => {
          this.getAccounts();
        });
        break;
      case 'import':
        this.dialog.open(ImportExcelComponent, {
          width: '500px',
          height: '350px'
        }).afterClosed().subscribe(result => {
          this.getAccounts();
        });
        break;
      case 'edit':
        this.dialog.open(AccountUpdateComponent, {
          width: '940px',
          height: '588px',
          data: ev.item
        }).afterClosed().subscribe(result => {
          this.getAccounts();
        });
        break;
      case 'delete':
        this.dialog.open(AccountDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.item,
            title: "Xoá Tài khoản",
            content: "Bạn có muốn xoá Tài khoản trên hệ thống?"
          }
        }).afterClosed().subscribe(result => {
          this.getAccounts();
        });
        break;
      case 'export':
        this.exportExcel();
        break;

    }
  }

}
