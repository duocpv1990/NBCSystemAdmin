import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-use-service',
  templateUrl: './use-service.component.html',
  styleUrls: ['./use-service.component.scss']
})
export class UseServiceComponent implements OnInit {
  useServices = [];

  constructor(
    public dialogRef: MatDialogRef<UseServiceComponent>
  ) { }

  ngOnInit(): void {
    this.useServices.length = 3;
  }

  closeDiaglog() {
    this.dialogRef.close();
  }

}
