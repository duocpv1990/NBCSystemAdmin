import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-outstanding-enterprise-delete',
  templateUrl: './outstanding-enterprise-delete.component.html',
  styleUrls: ['./outstanding-enterprise-delete.component.scss']
})
export class OutstandingEnterpriseDeleteComponent implements OnInit {

  model = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OutstandingEnterpriseDeleteComponent>,
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

  }
}
