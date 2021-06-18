import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import { AddCertificateComponent } from '../dialog/add-certificate/add-certificate.component';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseUploadComponent implements OnInit {
  @Input() data: any;
  @Input() option: any;
  @Input() arrayButton: any;
  @Input() dataModel?: any;
  @Output() callback = new EventEmitter<any>();

  html: '';
  model: any = {};
  imagePath;
  imgURL;
  constructor(
    private dialog: MatDialog,
    public s3Service: S3FileService
  ) {
    super(s3Service)
  }

  ngOnInit() {
    this.model = this.dataModel || {};
  }

  chooseLocation(event, check) {
    this.callback.emit(
      {
        check: check,
        value: event
      }
    );
  }

  preview(files, value) {
    if (value === 'avatar') {
      if (files.length === 0)
        return;

      this.multipleUpload(files).subscribe(
        (res) => { },
        (err) => { },
        () => {
          console.log(this.fileLinkList);
          this.model.MediaURL = this.fileLinkList[0];
        });

    }
    else if (value === 'background') {
      if (files.length === 0)
        return;
      this.multipleUpload(files).subscribe(
        (res) => { },
        (err) => { },
        () => {
          console.log(this.fileLinkList);
          this.model.BackgroundURL = this.fileLinkList[0];
        });
    }

  }
  onCallBackData = () => { }

  onClickButton = (i) => {
    i.data = this.model;
    this.callback.emit(i);
  }

  addCertificate() {
    this.dialog.open(AddCertificateComponent)
  }

}

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, MatDialogModule, MatMenuModule, FormsModule, MatIconModule],
  exports: [CreateComponent],
})
export class CreateModule { }
