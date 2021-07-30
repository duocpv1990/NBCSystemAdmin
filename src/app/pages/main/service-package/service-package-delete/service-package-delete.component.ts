import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-service-package-delete',
  templateUrl: './service-package-delete.component.html',
  styleUrls: ['./service-package-delete.component.scss']
})
export class ServicePackageDeleteComponent implements OnInit {

  model = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ServicePackageDeleteComponent>,
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



