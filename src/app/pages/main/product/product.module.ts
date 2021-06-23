import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { productRoute } from './product.routes';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { CreateModule } from 'src/app/components/create/create.component';
import { EditModule } from 'src/app/components/edit/edit.component';
import { DeleteModule } from 'src/app/components/dialog/delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleDirectiveModule } from 'src/app/utils/directives/role.directive';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { AddCertificateModule } from 'src/app/components/dialog/add-certificate/add-certificate.component';
@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(productRoute),
    FilterBaseModule,
    TableBaseModule,
    CreateModule,
    AddCertificateModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    EditModule,
    DeleteModule,
    FormsModule,
    RoleDirectiveModule,
  ],
  exports: [ProductComponent],
})
export class ProductModule {}
