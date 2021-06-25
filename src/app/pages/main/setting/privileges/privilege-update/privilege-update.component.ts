import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Privilege } from 'src/app/models/privilege.model';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-privilege-update',
  templateUrl: './privilege-update.component.html',
  styleUrls: ['./privilege-update.component.scss']
})
export class PrivilegeUpdateComponent implements OnInit {
  conFig = new Privilege();
  dataModel = {};
  option = {
    title: 'CHỈNH SỬA NHÓM QUYỀN',
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
  role;
  name = '';
  createdBy = '';
  updatedBy = '';
  createdDate = '';
  pageNumber = 1;
  pageSize = 10;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PrivilegeUpdateComponent>,
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
    this.getRole();
  }

  getRole() {
    this.privilegeService.getRoles(this.pageNumber, this.pageSize, this.createdDate, this.updatedBy, this.createdBy, this.name).subscribe(res => {
      this.role = res.payload.find((item) => {
        return item.RoleId === this.data.RoleId;
      });
      this.dataModel = this.role;
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
    this.privilegeService.updateRole(this.data.RoleId, this.dataModel).subscribe(res => {
      this.dialogRef.close();
    })
  }

}
