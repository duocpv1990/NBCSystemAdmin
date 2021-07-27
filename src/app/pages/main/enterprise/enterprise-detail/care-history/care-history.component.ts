import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-care-history',
  templateUrl: './care-history.component.html',
  styleUrls: ['./care-history.component.scss']
})
export class CareHistoryComponent implements OnInit {
  careHistories = [];

  constructor(
    public dialogRef: MatDialogRef<CareHistoryComponent>
  ) { }

  ngOnInit(): void {
    this.careHistories.length = 3;
  }

  closeDiaglog() {
    this.dialogRef.close();
  }

}
