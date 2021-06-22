import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Privilege } from 'src/app/models/privilege.model';

@Component({
  selector: 'app-privilege-update',
  templateUrl: './privilege-update.component.html',
  styleUrls: ['./privilege-update.component.scss']
})
export class PrivilegeUpdateComponent implements OnInit {
  conFig = new Privilege();
  dataModel = {};
  option = {
    title: 'THÊM MỚI NHÓM QUYỀN',
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
    private dialogRef: MatDialogRef<PrivilegeUpdateComponent>,
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
