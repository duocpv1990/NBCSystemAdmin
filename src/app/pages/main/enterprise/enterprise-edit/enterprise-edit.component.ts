import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { Observable } from 'rxjs';
import { AddCertificateComponent } from 'src/app/components/dialog/add-certificate/add-certificate.component';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { CertService } from 'src/app/services/cert.service';
import { CompanyService } from 'src/app/services/company.service';
import { DistributorsService } from 'src/app/services/distributors.service';
import { LocationService } from 'src/app/services/location.service';
import { ProductAddComponent } from '../../product/product-add/product-add.component';
import { categories, contries } from '../../product/product-add/product-mock';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-enterprise-edit',
  templateUrl: './enterprise-edit.component.html',
  styleUrls: ['./enterprise-edit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EnterpriseEditComponent
  extends BaseUploadComponent
  implements OnInit
{
  conFig = new Product();
  dataModel = {};
  option = {
    title: 'Thêm mới sản phẩm',
    type: 'create',
  };
  arrayButton = [
    {
      class: 'btn-cancel',
      text: 'Hủy bỏ',
    },
    {
      class: 'btn-save',
      text: 'Lưu',
    },
  ];
  imgAvatar;
  imgBg;
  nations = [];
  provinces = [];
  districts = [];
  nationId = 916;
  provinceId = 1;
  listMedia = [];

  listCreate = [];
  imageUrl: string;
  chips = [];
  chipInput = '';
  categories = categories;
  contries = contries;
  productForms: FormGroup;
  distributors: Observable<any[]>;
  distributorsProduct: any = [];
  distributorProduct: any;
  category$: Observable<any>;
  targetMarket$: Observable<any>;
  certList = [];
  bindingCertList: any = [];
  selectedDistributorsProduct: any = [];
  @ViewChildren('selectedDistributorsProductInput')
  selectedDistributorsProductInput: QueryList<ElementRef>;
  @ViewChildren('distributeProduct')
  selectedDistributeProduct: QueryList<ElementRef>;
  detailCopany;
  constructor(
    private certService: CertService,
    private fb: FormBuilder,
    private companySerice: CompanyService,
    private dialogRef: MatDialogRef<ProductAddComponent>,
    private dialog: MatDialog,
    public s3Service: S3FileService,
    private locationService: LocationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(s3Service);
    this.productForms = this.fb.group({
      Name: [''],
      Description: [''],
      CompanyCode: [''],
      GLN: [''],
      TaxCode: [''],
      NationId: [0],
      ProvinceId: [0],
      DistrictId: [0],
      AddressDetail: [''],
      PhoneNumber: [''],
      Email: [''],
      Website: [''],
      Type: [0],
      Status: [0],
      CertificationIdList: [[]],
      companyMedias: [],
    });
  }

  ngOnInit(): void {
    this.getNations();
    this.getProvinces();
    this.getDistricts();
    this.getDetailCompany(this.data.CompanyId);
  }

  getDetailCompany(id) {
    this.companySerice.getCompany(id).subscribe((res) => {
      console.log(res);
      this.detailCopany = res;
      this.productForms.get('Name').setValue(res.Name);
      this.productForms.get('Description').setValue(res.Description);
      this.productForms.get('CompanyCode').setValue(res.CompanyCode);
      this.productForms.get('GLN').setValue(res.GLN);
      this.productForms.get('TaxCode').setValue(res.TaxCode);
      this.productForms.get('NationId').setValue(res.NationId);
      this.productForms.get('ProvinceId').setValue(res.ProvinceId);
      this.productForms.get('DistrictId').setValue(res.DistrictId);
      this.productForms.get('AddressDetail').setValue(res.AddressDetail);
      this.productForms.get('PhoneNumber').setValue(res.PhoneNumber);
      this.productForms.get('Email').setValue(res.Email);
      this.productForms.get('Website').setValue(res.Website);
    });
  }
  getNations() {
    this.locationService.list().subscribe((res) => {
      this.nations = res.reverse();
    });
  }

  getProvinces() {
    this.locationService.getProvince(this.nationId).subscribe((res) => {
      this.provinces = res;
    });
  }

  getDistricts() {
    this.locationService.getDistrict(this.provinceId).subscribe((res) => {
      this.districts = res;
    });
  }

  cancel = () => {};

  save = (value) => {
    this.dataModel = value;
  };

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingradients: any[] = [];

  remove(fruit: any): void {
    const index = this.ingradients.indexOf(fruit);
    console.log(index);

    if (index >= 0) {
      this.ingradients.splice(index, 1);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addCertificate() {
    this.dialog.open(AddCertificateComponent);
  }

  submitForm() {
    this.productForms.get('CertificationIdList').setValue(this.certList);
    this.productForms.get('companyMedias').setValue(this.listMedia);
    console.log(this.productForms.value);
    this.companySerice
      .updateCompany(this.productForms.value, this.detailCopany.CompanyId)
      .subscribe((res) => {
        // console.log(res);
        this.closeDialog();
      });
  }

  uploadFilesAvatar(files: File[]): void {
    this.fileLinkList = [];
    this.multipleUpload(files).subscribe({
      complete: () => {
        console.log(this.fileLinkList);
        this.imgAvatar = this.fileLinkList[0];
        this.listMedia.push({
          MediaURL: this.fileLinkList[0],
          Type: 1,
          Status: 1,
        });
      },
    });
  }
  uploadFilesBg(files: File[]): void {
    this.fileLinkList = [];
    this.multipleUpload(files).subscribe({
      complete: () => {
        this.imgBg = this.fileLinkList[0];
        this.listMedia.push({
          MediaURL: this.fileLinkList[0],
          Type: 2,
          Status: 1,
        });
      },
    });
  }

  // tslint:disable-next-line: typedef
  trackByFunc(index) {
    return index;
  }

  addNewCert(): void {
    this.dialog
      .open(AddCertificateComponent)
      .afterClosed()
      .subscribe((data) => {
        console.log(data);
        console.log(data.data);
        if (data.type === 'save') {
          this.bindingCertList.push(data.data);
          this.certService.create(data.data).subscribe((res: any) => {
            console.log(res);
            this.certList.push(res.payload);
          });
        }
      });
  }
}
