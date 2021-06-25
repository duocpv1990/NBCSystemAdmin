import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-privilege-delete',
  templateUrl: './privilege-delete.component.html',
  styleUrls: ['./privilege-delete.component.scss']
})
export class PrivilegeDeleteComponent implements OnInit {
  model = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PrivilegeDeleteComponent>,
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.model = this.data;
  }

  handleEvent(ev) {
    console.log(ev);
    if (ev.value === 'cancel') {
      this.dialogRef.close();
    }
    if (ev.value === 'confirm') {
      this.deleteFunction();
    }
  }

  deleteFunction() {
    this.privilegeService.deleteRole(this.data.item.RoleId).subscribe(res => {
      this.dialogRef.close();
    });
  }


}
