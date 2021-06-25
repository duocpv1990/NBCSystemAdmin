import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCertificateComponent } from 'src/app/components/dialog/add-certificate/add-certificate.component';
import { Product } from 'src/app/models/product.model';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DistributorsService } from 'src/app/services/distributors.service';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CategoryService } from 'src/app/services/category.service';
import { map } from 'rxjs/operators';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { ProductService } from 'src/app/services/product.service';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import { CertService } from 'src/app/services/cert.service';
import { categories, contries } from '../../product/product-add/product-mock';
import { ProductAddComponent } from '../../product/product-add/product-add.component';
import { LocationService } from 'src/app/services/location.service';
import { CompanyService } from 'src/app/services/company.service';

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
  selector: 'app-enterprise-create',
  templateUrl: './enterprise-create.component.html',
  styleUrls: ['./enterprise-create.component.scss'],
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
export class EnterpriseCreateComponent
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
  constructor(
    private certService: CertService,
    private fb: FormBuilder,
    private companySerice: CompanyService,
    private categoryService: CategoryService,
    private distributorsService: DistributorsService,
    private dialogRef: MatDialogRef<ProductAddComponent>,
    private dialog: MatDialog,
    public s3Service: S3FileService,
    private locationService: LocationService
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
    this.distributors = this.distributorsService.list({
      name: '',
      provinceId: '',
      pageSize: 1000,
      pageNumber: 1,
    });
    this.listCreate = this.conFig.create;
    this.getNations();
    this.getProvinces();
    this.getDistricts();
  }
  getNations() {
    this.locationService.list().subscribe((res) => {
      this.nations = res.reverse();
      console.log(this.nations);

      this.listCreate[4].data = this.nations.map((nation) => {
        return {
          name: nation.Name,
          value: nation.NationId,
        };
      });
    });
  }

  getProvinces() {
    this.locationService.getProvince(this.nationId).subscribe((res) => {
      this.provinces = res;
      this.listCreate[5].data = this.provinces.map((province) => {
        return {
          name: province.Name,
          value: province.ProvinceId,
        };
      });
    });
  }

  getDistricts() {
    this.locationService.getDistrict(this.provinceId).subscribe((res) => {
      this.districts = res;
      this.listCreate[6].data = this.districts.map((district) => {
        return {
          name: district.Name,
          value: district.DistrictId,
        };
      });
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
    this.companySerice.create(this.productForms.value).subscribe((res) => {
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
