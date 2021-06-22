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
  mediaUrl;
  backgroundURL;
  certList = [];
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
      if (this.typeForms == 'enterprise') {
        this.certList = this.dataModel.CompanyCertifications;
        this.dataModel.CompanyMedias.forEach((el) => {
          if (el.Type == 1) {
            this.mediaUrl = el.MediaURL;
          } else {
            this.backgroundURL = el.MediaURL;
          }
        });
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
    if (value === 'avatar') {
      if (files.length === 0) return;
      this.multipleUpload(files).subscribe(
        (res) => {},
        (err) => {},
        () => {
          this.mediaUrl = this.fileLinkList[0];
          if (this.typeForms == 'enterprise') {
            this.model.CompanyMedias.push({
              CompanyId: this.model.CompanyId,
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
            this.model.CompanyMedias.push({
              CompanyId: this.model.CompanyId,
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
export class EditModule {}
