import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import { CertService } from 'src/app/services/cert.service';
import { AddCertificateComponent } from '../dialog/add-certificate/add-certificate.component';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseUploadComponent implements OnInit {
  @Input() data: any;
  @Input() option: any;
  @Input() arrayButton: any;
  @Input() typeForms: string;
  @Input() dataModel?: any;
  @Output() callback = new EventEmitter<any>();
  @Output() imgData = new EventEmitter<any>();
  html: '';
  model: any = {};
  imagePath;
  imgURL;
  backgroundURL;
  mediaUrl;
  certList = [];
  constructor(
    private dialog: MatDialog,
    public s3Service: S3FileService,
    private certService: CertService
  ) {
    super(s3Service);
  }

  ngOnInit() {
    this.model = this.dataModel || {};
  }

  chooseLocation(event, check) {
    this.callback.emit({
      check: check,
      value: event,
    });
  }

  preview(files, value) {
    if (this.typeForms == 'enterprise') {
      this.model.companyMedias = [];
    }
    this.fileLinkList = [];
    if (value === 'avatar') {
      if (files.length === 0) return;
      this.multipleUpload(files).subscribe(
        (res) => {},
        (err) => {},
        () => {
          console.log(this.fileLinkList);
          this.mediaUrl = this.fileLinkList[0];
          if (this.typeForms == 'enterprise') {
            this.model.companyMedias.push({
              MediaURL: this.fileLinkList[0],
              Type: 1,
              Status: 1,
            });
          }
        }
      );
    } else if (value === 'background') {
      if (files.length === 0) return;
      this.multipleUpload(files).subscribe(
        (res) => {},
        (err) => {},
        () => {
          console.log(this.fileLinkList);
          this.backgroundURL = this.fileLinkList[0];
          if (this.typeForms == 'enterprise') {
            this.model.companyMedias.push({
              MediaURL: this.fileLinkList[0],
              Type: 2,
              Status: 1,
            });
          }
        }
      );
    }
  }
  onCallBackData = () => {};

  onClickButton = (i) => {
    this.model.Type = 1;

    if (this.typeForms == 'enterprise') {
      this.model.CertificationIdList = this.certList;
    }

    i.data = this.model;
    this.callback.emit(i);
  };

  addCertificate() {
    this.dialog
      .open(AddCertificateComponent)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res.type == 'save') {
          this.certService.create(res.data).subscribe((res: any) => {
            console.log(res);
            this.certList.push(res.payload);
          });
        }
      });
  }
}

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [CreateComponent],
})
export class CreateModule {}
