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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import { CertService } from 'src/app/services/cert.service';
import { CompanyService } from 'src/app/services/company.service';
import { AddCertificateComponent } from '../dialog/add-certificate/add-certificate.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends BaseUploadComponent implements OnInit {
  @Input() data: any;
  @Input() option: any;
  @Input() arrayButton: any;
  @Input() typeForms: string;
  @Input() dataModel?: any;
  @Output() callback = new EventEmitter<any>();

  html: '';
  model: any = {};
  imagePath;
  imgURL;
  avatarUrl;
  backgroundURL;
  certList = [];
  listMedia: any = [];


  constructor(
    private dialog: MatDialog,
    public s3Service: S3FileService,
    private certService: CertService,
    private companyService: CompanyService
  ) {
    super(s3Service);
  }

  ngOnInit() {
    setTimeout(() => {
      this.model = this.dataModel;
      switch (this.typeForms) {
        case 'enterprise':
          this.certList = this.dataModel.CompanyCertifications;
          this.dataModel.CompanyMedias.forEach((el) => {
            if (el.Type == 1) {
              this.avatarUrl = el.MediaURL;
            } else {
              this.backgroundURL = el.MediaURL;
            }
          });
          break;
        case 'distributor':
          this.dataModel.DistributorMedias.forEach((el) => {
            if (el.Type == 1) {
              this.avatarUrl = el.MediaURL;
            } else {
              this.backgroundURL = el.MediaURL;
            }
          });
          break;
        case 'store':
          this.dataModel.StoreMedias.forEach((el) => {
            if (el.Type == 1) {
              this.avatarUrl = el.MediaURL;
            } else {
              this.backgroundURL = el.MediaURL;
            }
          });
          break;
      }


    }, 100);

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
              }
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
    if (this.typeForms == 'enterprise') {
      this.model.CertificationIdList = this.certList;
    }
    i.data = this.model;
    this.callback.emit(i);
  };

  addCertificate() {
    this.companyService
      .get('certificate', {
        companyId: this.dataModel.CompanyId,
      })
      .subscribe((res: any) => {
        this.dialog
          .open(AddCertificateComponent, {
            data: res.payload,
          })
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
      });
  }
}

@NgModule({
  declarations: [EditComponent],
  imports: [CommonModule, MatDialogModule, FormsModule, MatIconModule],
  exports: [EditComponent],
})
export class EditModule { }
