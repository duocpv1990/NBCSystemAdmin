import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {
  conFig = new Account();
  dataModel = {};
  option = {
    title: 'THÊM MỚI TÀI KHOẢN',
    type: 'create'
  };
  arrayButton = [{
    class: 'btn-cancel',
    text: 'Hủy bỏ'
  },
  {
    class: 'btn-save',
    text: 'Lưu'
  }];
  listCreate = [];
  roles = [];
  name = '';
  createdBy = '';
  updatedBy = '';
  createdDate = '';
  pageNumber = 1;
  pageSize = 10;

  constructor(
    private dialogRef: MatDialogRef<AccountAddComponent>,
    private accountService: AccountService,
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
    this.getRoles();
  }

  getRoles() {
    this.privilegeService.getRoles(this.pageNumber, this.pageSize, this.createdDate, this.updatedBy, this.createdBy, this.name).subscribe(res => {
      this.roles = res.payload.reverse();
      this.listCreate[4].data = this.roles.map(role => {
        return {
          name: role.Name,
          value: role.RoleId
        }
      }
      );
    });
  }


  handleCallbackEvent = (event) => {
    switch (event.class) {
      case 'btn-cancel':
        this.cancel();
        break;
      case 'btn-save':
        this.save(event.data)
        break;
      default:
        break;
    }

  }

  cancel = () => {
    this.dialogRef.close();
  }

  save = (value) => {
    this.dataModel = value;
    this.accountService.addAccount(this.dataModel).subscribe(res => {
      this.dialogRef.close();
    });
  }

}
