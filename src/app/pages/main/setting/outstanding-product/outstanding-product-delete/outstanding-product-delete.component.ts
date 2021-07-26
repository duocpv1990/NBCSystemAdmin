import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-outstanding-product-delete',
  templateUrl: './outstanding-product-delete.component.html',
  styleUrls: ['./outstanding-product-delete.component.scss']
})
export class OutstandingProductDeleteComponent implements OnInit {
  model = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OutstandingProductDeleteComponent>,
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
