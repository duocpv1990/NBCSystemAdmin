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
import { categories, contries } from './product-mock';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
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
export class ProductAddComponent extends BaseUploadComponent implements OnInit {
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
    private productService: ProductService,
    private categoryService: CategoryService,
    private distributorsService: DistributorsService,
    private dialogRef: MatDialogRef<ProductAddComponent>,
    private dialog: MatDialog,
    public s3Service: S3FileService
  ) {
    super(s3Service);
    this.distributorProduct = [
      {
        DistributorId: [''],
        Type: 1,
        Status: 1,
        DistributorProductStores: [
          {
            StoreId: [''],
            Type: 1,
            Status: 1,
          },
        ],
      },
    ];
    this.productForms = this.fb.group({
      CompanyId: [7],
      ProductCode: [''],
      TargetMarketIdList: [''],
      Name: [''],
      Description: [''],
      Price: [''],
      CategoryId: [''],
      Ingredient: [''],
      Label: [''],
      Capacity: [''],
      Unit: [''],
      ManufacturedOn: [moment()],
      ExpiredOn: [moment()],
      Manual: [''],
      Type: [1],
      Status: [1],
      CertificationIdList: [[]],
      ProductMedias: [[]],
      DistributorProducts: this.fb.array([]),
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
    this.getDistributorProducts();
    this.getCategoryProduct();
  }

  getCategoryProduct() {
    this.category$ = this.categoryService.list();
    this.targetMarket$ = this.categoryService
      .getTargetMarket()
      .pipe(map((res) => res.payload));
  }

  get distributorProducts() {
    return this.productForms.get('DistributorProducts') as FormArray;
  }

  getDistributorProducts() {
    const control = this.distributorProducts;
    this.distributorProduct.forEach((res) => {
      control.push(this.getDistributorProductsVal(res));
    });
  }

  disSelected(ev, i) {
    this.distributorsService
      .getDistributorProduct(ev.option.value)
      .subscribe((res) => {
        // if (i >= this.distributorsProduct.length && res.payload[0]) {
        //   this.distributorsProduct.push([]);
        // }
        // if (res.payload.length == 0) {
        //   this.distributorsProduct[i] = [];
        // }
        this.distributorsProduct = res.payload;
        // if (res.payload[0]) {
        //   this.distributorsProduct[i].push(res.payload[0]);
        // } else {
        //   this.distributorsProduct[i] = [];
        // }

        console.log(this.distributorsProduct);

        this.selectedDistributeProduct.toArray()[i].nativeElement.value =
          ev.option.viewValue;
      });
  }

  removeControl(i) {
    const control = this.distributorProducts;
    control.removeAt(i);
  }

  getDistributorProductsVal(res) {
    return this.fb.group({
      ...res,
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.ingradients.push(value);
      this.productForms.get('Ingradient').setValue(this.ingradients.toString());
    }

    // Clear the input value
    event.input!.value = '';
  }

  addDis(event: MatChipInputEvent, i): void {
    const value = (event.value || '').trim();
    console.log(event.value);

    // Add our fruit
    if (value) {
      console.log(this.distributorsProduct);

      // this.selectedDistributorsProduct.push({
      //   name: this.distributorsProduct.find(
      //     (res) => res.DistributorProductId == value
      //   ).Name,
      // });
    }

    // Clear the input value
    // event.input!.value = '';
  }

  remove(fruit: any): void {
    const index = this.ingradients.indexOf(fruit);
    console.log(index);

    if (index >= 0) {
      this.ingradients.splice(index, 1);
    }
  }

  removeDis(fruit: any, i): void {
    const index = this.selectedDistributorsProduct[i].indexOf(fruit);
    if (index >= 0) {
      this.selectedDistributorsProduct[i].splice(index, 1);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  selected(event: MatAutocompleteSelectedEvent, i, parent): void {
    const control = this.distributorProducts;

    let dataPush = [control.at(i).get('DistributorProductStores').value];
    // dataPush.concat();
    // dataPush.push(event.option.value);
    dataPush.push(event.option.value);
    console.log(dataPush);

    // console.log(control.at(i).get('DistributorProductStores'));
    this.selectedDistributorsProduct.push([]);
    this.selectedDistributorsProduct[i].push({
      Name: event.option.viewValue,
      ...event.option.value,
    });
    control
      .at(i)
      .get('DistributorProductStores')
      .setValue(this.selectedDistributorsProduct[i]);
    console.log(this.selectedDistributorsProduct[i]);

    this.selectedDistributorsProductInput.toArray()[i].nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
  }
  addCertificate() {
    this.dialog.open(AddCertificateComponent);
  }

  submitForm() {
    this.productForms.get('CertificationIdList').setValue(this.certList);
    this.productForms
      .get('ExpiredOn')
      .setValue(this.productForms.get('ExpiredOn').value.toISOString());
    this.productForms
      .get('ManufacturedOn')
      .setValue(this.productForms.get('ManufacturedOn').value.toISOString());
    console.log(this.productForms.value);
    this.productService.create(this.productForms.value).subscribe((res) => {
      console.log(res);
    });
  }

  uploadFilesS3(files: File[]) {
    this.multipleUpload(files).subscribe({
      complete: () => {
        console.log(this.fileLinkList);
        let completeArr = this.fileLinkList.map((res) => ({
          MediaURL: res,
          Type: 3,
          Status: 1,
        }));
        this.productForms.get('ProductMedias').setValue(completeArr);
      },
    });
  }

  trackByFunc(index) {
    return index;
  }

  addNewCert() {
    this.dialog
      .open(AddCertificateComponent)
      .afterClosed()
      .subscribe((data) => {
        console.log(data);
        console.log(data.data);
        if (data.type == 'save') {
          this.bindingCertList.push(data.data);
          this.certService.create(data.data).subscribe((res: any) => {
            console.log(res);
            this.certList.push(res.payload);
          });
        }
      });
  }
}
