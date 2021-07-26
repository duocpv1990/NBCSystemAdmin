import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { settingRoute } from './setting.routes';
import { SettingComponent } from './setting.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { PrivilegesComponent } from './privileges/privileges.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { CreateModule } from 'src/app/components/create/create.component';
import { AccountAddComponent } from './account/account-add/account-add.component';
import { AccountUpdateComponent } from './account/account-update/account-update.component';
import { AccountDeleteComponent } from './account/account-delete/account-delete.component';
import { PrivilegeAddComponent } from './privileges/privilege-add/privilege-add.component';
import { PrivilegeUpdateComponent } from './privileges/privilege-update/privilege-update.component';
import { PrivilegeDeleteComponent } from './privileges/privilege-delete/privilege-delete.component';
import { DeleteModule } from 'src/app/components/dialog/delete/delete.component';
import { EditModule } from 'src/app/components/edit/edit.component';
import { ToastrModule } from 'ngx-toastr';
import { ReasonComponent } from './reason/reason.component';
import { ReasonAddComponent } from './reason/reason-add/reason-add.component';
import { ReasonUpdateComponent } from './reason/reason-update/reason-update.component';
import { ReasonDeleteComponent } from './reason/reason-delete/reason-delete.component';
import { OutstandingEnterpriseComponent } from './outstanding-enterprise/outstanding-enterprise.component';
import { OutstandingProductComponent } from './outstanding-product/outstanding-product.component';
import { OutstandingEnterpriseDeleteComponent } from './outstanding-enterprise/outstanding-enterprise-delete/outstanding-enterprise-delete.component';
import { OutstandingEnterpriseCreateComponent } from './outstanding-enterprise/outstanding-enterprise-create/outstanding-enterprise-create.component';
import { OutstandingEnterpriseUpdateComponent } from './outstanding-enterprise/outstanding-enterprise-update/outstanding-enterprise-update.component';
import { OutstandingProductCreateComponent } from './outstanding-product/outstanding-product-create/outstanding-product-create.component';
import { OutstandingProductUpdateComponent } from './outstanding-product/outstanding-product-update/outstanding-product-update.component';
import { OutstandingProductDeleteComponent } from './outstanding-product/outstanding-product-delete/outstanding-product-delete.component';


@NgModule({
  declarations: [
    SettingComponent,
    AccountComponent,
    AuthorizationComponent,
    PrivilegesComponent,
    AccountAddComponent,
    AccountUpdateComponent,
    AccountDeleteComponent,
    PrivilegeAddComponent,
    PrivilegeUpdateComponent,
    PrivilegeDeleteComponent,
    ReasonComponent,
    ReasonAddComponent,
    ReasonUpdateComponent,
    ReasonDeleteComponent,
    OutstandingEnterpriseComponent,
    OutstandingProductComponent,
    OutstandingEnterpriseDeleteComponent,
    OutstandingEnterpriseCreateComponent,
    OutstandingEnterpriseUpdateComponent,
    OutstandingProductCreateComponent,
    OutstandingProductUpdateComponent,
    OutstandingProductDeleteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(settingRoute),
    FilterBaseModule,
    TableBaseModule,
    CreateModule,
    DeleteModule,
    EditModule,
    ToastrModule.forRoot()
  ]
})
export class SettingModule { }
