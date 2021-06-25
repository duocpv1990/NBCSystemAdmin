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
  avatarUrl;
  certList = [];
  listMedia: any = [];

  constructor(
    private dialog: MatDialog,
    public s3Service: S3FileService,
    private certService: CertService
  ) {
    super(s3Service);
  }

  ngOnInit() {
    this.model = this.dataModel || {};
    console.log(this.typeForms);
  }

  chooseLocation(event, check) {
    this.callback.emit({
      check: check,
      value: event,
    });
  }

  preview(files, value) {
    if (!files) return;
    switch (this.typeForms) {
      case 'enterprise':
        this.model.companyMedias = [];
        break;
      case 'distributor':
        this.model.distributorMedias = [];
        break;
      case 'store':
        this.model.storeMedias = [];
        break;
    }

    this.fileLinkList = [];
    if (value === 'avatar') {
      this.selectImage(files).subscribe(
        (res) => { },
        (err) => { },
        () => {
          console.log(this.imageLinkUpload);
          this.avatarUrl = this.imageLinkUpload;
          switch (this.typeForms) {
            case 'enterprise':
              this.model.companyMedias.push({
                MediaURL: this.imageLinkUpload,
                Type: 1,
                Status: 1,
              });
              break;
            case 'distributor':
              let model = {
                MediaURL: this.imageLinkUpload,
                Type: 1,
                Status: 1,
              };
              this.listMedia.push(model);
              console.log(this.listMedia);

              break;
            case 'store':
              this.model.storeMedias.push({
                MediaURL: this.imageLinkUpload,
                Type: 1,
                Status: 1,
              });
              break;
          }
        }
      );
    } else if (value === 'background') {
      this.selectImage(files).subscribe(
        (res) => { },
        (err) => { },
        () => {
          console.log(this.imageLinkUpload);
          this.backgroundURL = this.imageLinkUpload;
          switch (this.typeForms) {
            case 'enterprise':
              this.model.companyMedias.push({
                MediaURL: this.imageLinkUpload,
                Type: 2,
                Status: 1,
              });
              break;
            case 'distributor':
              let background = {
                MediaURL: this.imageLinkUpload,
                Type: 2,
                Status: 1,
              };
              this.listMedia.push(background);
              console.log(this.listMedia);

              break;
            case 'store':
              this.model.storeMedias.push({
                MediaURL: this.imageLinkUpload,
                Type: 2,
                Status: 1,
              });
              break;
          }
        }
      );
    }
  }
  onCallBackData = () => { };

  onClickButton = (i) => {
    this.model.Type = 1;
    this.model.distributorMedias = this.listMedia;
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
export class CreateModule { }
