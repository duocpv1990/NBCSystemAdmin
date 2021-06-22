import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
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
  distributors: Observable<any>;
  distributorsProduct: any;
  distributorProduct: any;
  selectedDistributorsProduct: any = [];
  @ViewChild('selectedDistributorsProductInput')
  selectedDistributorsProductInput: ElementRef;
  @ViewChild('distributeProduct')
  selectedDistributeProduct: ElementRef;
  constructor(
    private fb: FormBuilder,
    private distributorsService: DistributorsService,
    private dialogRef: MatDialogRef<ProductAddComponent>,
    private dialog: MatDialog
  ) {
    this.distributorProduct = [
      {
        ProductId: [''],
        Type: [''],
        Status: [''],
        DistributorProductStores: [
          {
            StoreId: [''],
            Type: [''],
            Status: [''],
          },
        ],
      },
    ];
    this.productForms = this.fb.group({
      ProductCode: [''],
      Name: [''],
      Description: [''],
      Price: [''],
      CategoryId: [''],
      Ingradient: [''],
      Label: [''],
      Capacity: [''],
      Unit: [''],
      ManufacturedOn: [''],
      ExpiredOn: [''],
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
  }

  get distributorProducts() {
    return this.productForms.get('DistributorProducts') as FormArray;
  }

  getDistributorProducts() {
    const control = this.productForms.get('DistributorProducts') as FormArray;
    this.distributorProduct.forEach((res) => {
      control.push(this.getDistributorProductsVal(res));
    });
  }

  disSelected(ev) {
    this.distributorsService
      .getDistributorProduct(ev.option.value)
      .subscribe((res) => {
        this.distributorsProduct = res.payload;
        this.selectedDistributeProduct.nativeElement.value =
          ev.option.viewValue;
      });
  }

  removeControl(i) {
    const control = this.productForms.get('DistributorProducts') as FormArray;
    control.removeAt(i);
  }

  getDistributorProductsVal(res) {
    return this.fb.group({
      ...res,
    });
  }

  handleCallbackEvent = (value) => {
    console.log(value);

    switch (value.class) {
      case 'btn-cancel':
        this.cancel();
        break;
      case 'btn-save':
        this.save(value.data);
        break;
      default:
        break;
    }
    this.dialogRef.close();
  };

  cancel = () => {};

  save = (value) => {
    this.dataModel = value;
  };

  processFile(files: File) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result.toString();
    };
  }

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
      this.ingradients.push({ name: value });
    }

    // Clear the input value
    event.input!.value = '';
  }
  addDis(event: MatChipInputEvent): void {
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
  removeDis(fruit: any): void {
    const index = this.selectedDistributorsProduct.indexOf(fruit);
    console.log(index);

    if (index >= 0) {
      this.selectedDistributorsProduct.splice(index, 1);
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);

    this.selectedDistributorsProduct.push({ Name: event.option.viewValue });
    this.selectedDistributorsProductInput.nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
  }
  addCertificate() {
    this.dialog.open(AddCertificateComponent);
  }
}
