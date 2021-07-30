import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contract-deni',
  templateUrl: './contract-deni.component.html',
  styleUrls: ['./contract-deni.component.scss']
})
export class ContractDeniComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ContractDeniComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
