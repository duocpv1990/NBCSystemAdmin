import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Privilege } from 'src/app/models/privilege.model';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-privilege-add',
  templateUrl: './privilege-add.component.html',
  styleUrls: ['./privilege-add.component.scss']
})
export class PrivilegeAddComponent implements OnInit {
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
    text: 'Xác nhận'
  }];
  listCreate = [];

  constructor(
    private dialogRef: MatDialogRef<PrivilegeAddComponent>,
    private privilegeService: PrivilegeService
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
    this.privilegeService.create(this.dataModel).subscribe(res => {
      this.dialogRef.close();
    })
  }

}
