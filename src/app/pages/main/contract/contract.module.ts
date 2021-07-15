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


@NgModule({
  declarations: [
    ContractComponent,
    ContractListComponent,
    ContractCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(contractRoute),
    FilterBaseModule,
    TableBaseModule,
    AngularEditorModule
  ]
})
export class ContractModule { }
