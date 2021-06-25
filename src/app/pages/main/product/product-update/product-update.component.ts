import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import moment from 'moment';
import { from, Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { AddCertificateComponent } from 'src/app/components/dialog/add-certificate/add-certificate.component';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { CertService } from 'src/app/services/cert.service';
import { DistributorsService } from 'src/app/services/distributors.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductAddComponent } from '../product-add/product-add.component';
import { categories, contries } from '../product-add/product-mock';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent
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
  fileLinkListView: any = [];
  selectedNotDistributors: any = [];
  distributeNotEdit = [];
  constructor(
    private certService: CertService,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private distributorsService: DistributorsService,
    private dialogRef: MatDialogRef<ProductAddComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public s3Service: S3FileService
  ) {
    super(s3Service);
    this.distributorProduct = [
      {
        DistributorId: [''],
        ProductId: this.data.ProductId,
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
      // Description: [''],
      Price: [''],
      CategoryId: [''],
      Ingredient: [''],
      Label: [''],
      CertificationIdList: [[]],
      Capacity: [''],
      Unit: [''],
      ManufacturedOn: [moment()],
      ExpiredOn: [moment()],
      Manual: [''],
      Type: [1],
      Status: [1],
      ProductMedias: [[]],
      DistributorProducts: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.productService
      .get('detail', {
        productId: this.data.ProductId,
      })
      .pipe(
        tap((res) => {
          res.payload.DistributorProducts.forEach((el) => {
            this.distributeNotEdit.push(el);
            this.selectedNotDistributors.push(el.DistributorProductStores);
            console.log(this.selectedNotDistributors);
          });
          if (res.payload.Ingredient) {
            this.ingradients = res.payload.Ingredient.split(',');
          }
          this.bindingCertList = res.payload.ProductCertifications;
          this.fileLinkListView = res.payload.ProductMedias.map(
            (a) => a.MediaURL
          );
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.initForm(res.payload);
      });

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

  removeDisNot(disId, index) {
    this.distributorsService.deleteDisProduct(disId).subscribe(() => {
      this.distributeNotEdit.splice(index, 1);
    });
  }

  initForm(data) {
    this.productForms.get('CompanyId').setValue(7);
    this.productForms.get('Price').setValue(data.Price);
    this.productForms.get('Ingredient').setValue(data.Ingredient);
    this.productForms.get('CategoryId').setValue(data.CategoryId);
    this.productForms.get('Label').setValue(data.Label);
    this.productForms.get('Capacity').setValue(data.Capacity);
    this.productForms.get('Unit').setValue(data.Unit);
    this.productForms.get('ManufacturedOn').setValue(data.ManufacturedOn);
    this.productForms.get('ExpiredOn').setValue(data.ExpiredOn);
    this.productForms.get('Manual').setValue(data.Manual);
    this.productForms.get('Type').setValue(data.Type);
    this.productForms.get('Status').setValue(data.Status);
    // this.productForms.get('ProductMedias').setValue(data.ProductMedias);
    this.productForms
      .get('CertificationIdList')
      .setValue(data.CertificationIdList);
    this.productForms.get('ProductCode').setValue(data.ProductCode);
    this.productForms
      .get('TargetMarketIdList')
      .setValue(data.TargetMarketIdList);
    this.productForms.get('Name').setValue(data.Name);
    console.log(this.productForms.value);
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
  isUploadNewFile = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingradients: any[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.ingradients.push(value);
      this.productForms.get('Ingredient').setValue(this.ingradients.toString());
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
    // console.log(this.productForms.value);
    // delete this.productForms.value.CertificationIdList;
    console.log(this.productForms.value);

    console.log(this.productForms.get('ProductMedias').value);
    if (this.isUploadNewFile == false) {
      delete this.productForms.value.ProductMedias;
    } else {
      console.log(this.productForms.get('ProductMedias').value);

      if (this.productForms.get('ProductMedias').value.length > 0) {
        from(this.productForms.get('ProductMedias').value)
          .pipe(
            concatMap((res: any) =>
              this.productService.postProductMedia({
                ProductId: this.data.ProductId,
                MediaURL: res.MediaURL,
                Type: res.Type,
                Status: 1,
              })
            )
          )
          .subscribe();
      }
    }

    if (
      this.productForms.value.DistributorProducts.some(
        (a) => a.DistributorId === '' || !a.DistributorId
      ) === true
    ) {
      delete this.productForms.value.DistributorProducts;
    } else {
      if (this.productForms.get('DistributorProducts').value) {
        from(this.productForms.get('DistributorProducts').value)
          .pipe(
            concatMap((res) => this.distributorsService.postDisProduct(res))
          )
          .subscribe();
      }
    }

    this.productService
      .updateProduct(this.productForms.value, this.data.ProductId)
      .subscribe((res) => {
        this.closeDialog();
      });

    if (this.certList.length > 0) {
      from(this.certList)
        .pipe(
          concatMap((res) =>
            this.productService.postProductCert({
              CertificationId: res,
              ProductId: this.data.ProductId,
              Type: 1,
              Status: 1,
            })
          )
        )
        .subscribe();
    }
    // this.productForms.get('CertificationIdList').setValue(this.certList);
  }

  uploadFilesS3(files: File[]) {
    this.isUploadNewFile = true;
    this.multipleUpload(files).subscribe({
      complete: () => {
        console.log(this.fileLinkList);
        let completeArr = this.fileLinkList.map((res) => ({
          MediaURL: res,
          Type: 3,
          Status: 1,
        }));
        this.fileLinkListView.push(...this.fileLinkList);
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
