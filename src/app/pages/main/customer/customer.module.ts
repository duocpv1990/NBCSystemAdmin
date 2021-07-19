import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { customerRoute } from './customer.routes';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';



@NgModule({
  declarations: [CustomerComponent, CustomerListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoute),
    FilterBaseModule,
    TableBaseModule
  ]
})
export class CustomerModule { }
