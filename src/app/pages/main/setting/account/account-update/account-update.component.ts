import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/models/account.model';

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

  constructor(
    private dialogRef: MatDialogRef<AccountUpdateComponent>,
  ) { }

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
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
