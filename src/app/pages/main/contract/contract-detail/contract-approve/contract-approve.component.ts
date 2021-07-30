import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contract-approve',
  templateUrl: './contract-approve.component.html',
  styleUrls: ['./contract-approve.component.scss']
})
export class ContractApproveComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ContractApproveComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
