import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {
  conFig = new Account();
  dataModel = {};
  option = {
    title: 'CHỈNH SỬA TÀI KHOẢN',
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
  pageNumber = 1;
  pageSize = 50;
  name = '';
  status = '';
  createdBy = '';
  roleId = '';
  accounts = [];
  roles = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AccountUpdateComponent>,
    private accountService: AccountService,
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
    this.getAccounts();
    this.getRoles();
  }

  getAccounts() {
    this.accountService.getAccounts(this.pageNumber, this.pageSize, this.name, this.status, this.createdBy, this.roleId).subscribe(res => {
      this.accounts = res.payload;
      this.dataModel = this.accounts.find(item => item.UserProfileId == this.data.UserProfileId);
      console.log('dataModel', this.dataModel);

    });
  }

  getRoles() {
    this.privilegeService.getRoles(this.pageNumber, this.pageSize, '', '', this.createdBy, this.name).subscribe(res => {
      this.roles = res.payload.reverse();
      this.listCreate[4].data = this.roles.map((role) => {
        return {
          name: role.Name,
          value: role.RoleId,
        };
      });
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
  }

}
