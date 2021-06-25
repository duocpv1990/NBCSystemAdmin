import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import { DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { DynamicFormsBasicUIModule } from '@ng-dynamic-forms/ui-basic';
import { combineLatest } from 'rxjs';
import { mergeMap, startWith } from 'rxjs/operators';
import { DistributorService } from 'src/app/services/distributor.service';

@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.scss'],
})
export class NewEditComponent extends BaseUploadComponent implements OnInit {
  @Input() MY_FORM_MODEL: DynamicFormModel;
  @Input() listDistrict: any;
  @Input() dataEdit: any;
  @Output() search = new EventEmitter();
  @ContentChild('formsContent', { static: false })
  formsContent!: TemplateRef<any>;

  formModel: DynamicFormModel;
  formGroup: FormGroup;
  @Output() provinceChange = new EventEmitter();
  avatarUrl;
  backgroundURL;
  districtId;
  constructor(
    private dialogRef: MatDialogRef<NewEditComponent>,
    private formService: DynamicFormService,
    public s3Service: S3FileService,
    private distributorService: DistributorService
  ) {
    super(s3Service);
  }

  ngOnInit(): void {
    this.formModel = this.MY_FORM_MODEL;
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.avatarUrl = this.dataEdit.DistributorMedias.find(
      (a) => a.Type == 1
    ).MediaURL;
    this.backgroundURL = this.dataEdit.DistributorMedias.find(
      (a) => a.Type == 2
    ).MediaURL;
    this.formGroup.get('ProvinceId').valueChanges.subscribe((res) => {
      if (res) {
        this.provinceChange.emit(res);
      }
    });
    this.formGroup.addControl('DistrictId', new FormControl(''));
    this.formGroup.get('DistrictId').setValue(this.dataEdit.DistrictId);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeAvatar(files: File[]) {
    this.fileLinkList = [];
    this.multipleUpload(files).subscribe({
      complete: () => {
        this.avatarUrl = this.fileLinkList[0];
      },
    });
  }

  changeBackground(files: File[]) {
    this.fileLinkList = [];
    this.multipleUpload(files).subscribe({
      complete: () => {
        this.backgroundURL = this.fileLinkList[0];
      },
    });
  }

  value2(ev) {
    console.log(ev);
  }

  submitForm() {
    this.distributorService
      .updateDistributor(this.formGroup.value, this.dataEdit.DistributorId)
      .pipe(
        mergeMap(() =>
          combineLatest([
            this.distributorService.updateDistributorMedia({
              DistributorId: this.dataEdit.DistributorId,
              MediaURL: this.backgroundURL,
              Type: 2,
              Status: 1,
            }),
            this.distributorService.updateDistributorMedia({
              DistributorId: this.dataEdit.DistributorId,
              MediaURL: this.avatarUrl,
              Type: 1,
              Status: 1,
            }),
          ])
        )
      )
      .subscribe(() => {
        this.closeDialog();
      });
    // this.distributorService.updateDistributorMedia({
    //   DistributorId: this.data.DistributorId,
    //   MediaURL: this.fileLinkList[0],
    //   Type: 2,
    //   Status: 1,
    // });
  }
}

@NgModule({
  declarations: [NewEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    DynamicFormsBasicUIModule,
  ],
  exports: [NewEditComponent],
})
export class NewEditModule {}
