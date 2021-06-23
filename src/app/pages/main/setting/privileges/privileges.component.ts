import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { Privilege } from 'src/app/models/privilege.model';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { PrivilegeAddComponent } from './privilege-add/privilege-add.component';
import { PrivilegeDeleteComponent } from './privilege-delete/privilege-delete.component';
import { PrivilegeUpdateComponent } from './privilege-update/privilege-update.component';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss']
})
export class PrivilegesComponent implements OnInit {

  listFilter;
  config = new Privilege();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  name = '';
  createdBy = '';
  updatedBy = '';
  createdDate = '';
  pageNumber = 1;
  pageSize = 10;
  roles = [];

  constructor(
    private dialog: MatDialog,
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.getRoles();
  }

  getRoles() {
    this.privilegeService.getRoles(this.pageNumber, this.pageSize, this.createdDate, this.updatedBy, this.createdBy, this.name).subscribe(res => {
      this.roles = res.payload.reverse();
    });
  }

  handleCallback(ev) {
    const filter = this.listFilter.filter(x => x.value);
    if (!filter.length) return this.dataSub = this.roles;
    filter.forEach((x, ix) => {
      if (ix === 0) {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.roles.filter(
            (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
        } else {
          this.dataSub = this.roles.filter((a) => a[x.condition] == x.value);
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
      return this.dialog.open(PrivilegeAddComponent, {
        width: '642px',
        height: '382px'
      }).afterClosed().subscribe(result => {
        this.getRoles();
      });
    }
    if (ev.type === 'import') {
      return this.dialog.open(ImportExcelComponent, {
        width: '500px',
        height: '350px'
      }).afterClosed().subscribe(result => {
        this.getRoles();
      });
    }
    if (ev.type === 'edit') {
      return this.dialog.open(PrivilegeUpdateComponent, {
        width: '642px',
        height: '382px',
        data: ev.item
      }).afterClosed().subscribe(result => {
        this.getRoles();
      });
    }
    if (ev.type === 'delete') {
      return this.dialog.open(PrivilegeDeleteComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item,
          title: "Xoá Tài khoản",
          content: "Bạn có muốn xoá Tài khoản trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
        this.getRoles();
      });
    }
  }

}
