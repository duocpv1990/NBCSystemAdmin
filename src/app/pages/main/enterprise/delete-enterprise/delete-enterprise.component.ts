import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-delete-enterprise',
  templateUrl: './delete-enterprise.component.html',
  styleUrls: ['./delete-enterprise.component.scss']
})
export class DeleteEnterpriseComponent implements OnInit {
  model = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteEnterpriseComponent>,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.model = this.data;
    console.log('model', this.model);

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
    from(this.data.item)
      .pipe(
        filter((res: any) => res.isChecked === true),
        concatMap((res) => this.companyService.deleteCompany(res.id))
      )
      .subscribe({
        complete: () => {
          this.dialogRef.close();;
        },
      });
    // this.companyService.deleteCompany(this.data.item.CompanyId).subscribe(res => {
    //   this.dialogRef.close();
    // });
  }

}
