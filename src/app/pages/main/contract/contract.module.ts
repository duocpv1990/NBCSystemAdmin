import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { ContractComponent } from './contract.component';
import { contractRoute } from './contract.routes';
import { ContractListComponent } from './contract-list/contract-list.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractApproveComponent } from './contract-detail/contract-approve/contract-approve.component';
import { ContractDeniComponent } from './contract-detail/contract-deni/contract-deni.component';
import { ContractCancelComponent } from './contract-detail/contract-cancel/contract-cancel.component';


@NgModule({
  declarations: [
    ContractComponent,
    ContractListComponent,
    ContractCreateComponent,
    ContractDetailComponent,
    ContractApproveComponent,
    ContractDeniComponent,
    ContractCancelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(contractRoute),
    FilterBaseModule,
    TableBaseModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContractModule { }
