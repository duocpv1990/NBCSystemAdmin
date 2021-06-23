import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss'],
})
export class AddCertificateComponent
  extends BaseUploadComponent
  implements OnInit
{
  fileNames = [];
  fileString;
  certificationType: any;
  certificationMediaLink: string;
  imagesPick: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  model: any = {};
  constructor(
    private dialogRef: MatDialogRef<AddCertificateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public s3Service: S3FileService
  ) {
    super(s3Service);
  }

  ngOnInit(): void {
    if (this.data) {
      this.model = this.data;
    }
  }

  closeDialog(type) {
    this.model.Type = 1;
    if (this.certificationType) {
      this.model.CertificationMedia = [
        {
          MediaURL: this.certificationMediaLink,
          Type: 1,
          Status: 1,
        },
      ];
    }
    this.model.fileNameList = this.fileNames;
    this.dialogRef.close({
      type,
      data: this.model,
    });
  }

  onSelectFile(files) {
    const fileArr = Object.values(files);
    this.model.CertificationMedia = [];
    this.multipleUpload(files).subscribe({
      complete: () => {
        console.log(this.fileLinkList);
        this.model.CertificationMedia.push({
          MediaURL: this.fileLinkList[0],
          Type: 1,
          Status: 1,
        });
      },
    });
    fileArr.forEach((val: any) => {
      const type = val.type.split('/');
      if (type[0] == 'image') {
        this.fileNames.push(val.name);
        console.log('fileName', this.fileNames);
      }
    });
  }
}

@NgModule({
  declarations: [AddCertificateComponent],
  imports: [CommonModule, MatDialogModule, FormsModule],
  exports: [AddCertificateComponent],
})
export class AddCertificateModule {}
