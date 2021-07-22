import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { enterpriseRoute } from './enterprise.routes';
import { EnterpriseComponent } from './enterprise.component';
import { EnterpriseListComponent } from './enterprise-list/enterprise-list.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { CreateModule } from 'src/app/components/create/create.component';
import { EnterpriseCreateComponent } from './enterprise-create/enterprise-create.component';
import {
  DeleteComponent,
  DeleteModule,
} from 'src/app/components/dialog/delete/delete.component';
import { DeleteEnterpriseComponent } from './delete-enterprise/delete-enterprise.component';
import { EnterpriseEditComponent } from './enterprise-edit/enterprise-edit.component';
import { EditModule } from 'src/app/components/edit/edit.component';
import { NewFilterModule } from 'src/app/components/new-filter/new-filter.component';
import { ServerSideTableModule } from 'src/app/components/server-side-table/server-side-table.component';
import { AddCertificateModule } from 'src/app/components/dialog/add-certificate/add-certificate.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { RoleDirectiveModule } from 'src/app/utils/directives/role.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EnterpriseDetailComponent } from './enterprise-detail/enterprise-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    EnterpriseComponent,
    EnterpriseListComponent,
    EnterpriseCreateComponent,
    DeleteEnterpriseComponent,
    EnterpriseEditComponent,
    EnterpriseDetailComponent,
  ],
  imports: [
    CommonModule,
    FilterBaseModule,
    TableBaseModule,
    CreateModule,
    DeleteModule,
    NewFilterModule,
    ServerSideTableModule,
    EditModule,
    RouterModule.forChild(enterpriseRoute),
    AddCertificateModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    ServerSideTableModule,
    RoleDirectiveModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [EnterpriseComponent],
})
export class EnterpriseModule { }
