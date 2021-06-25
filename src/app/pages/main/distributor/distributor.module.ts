import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { distributorRoute } from './distributor.routes';
import { DistributorComponent } from './distributor.component';
import { DistributorListComponent } from './distributor-list/distributor-list.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { CreateDistributorComponent } from './create-distributor/create-distributor.component';
import { CreateModule } from 'src/app/components/create/create.component';
import { DeleteDistributorComponent } from './delete-distributor/delete-distributor.component';
import { DeleteModule } from 'src/app/components/dialog/delete/delete.component';
import { EditDistributorComponent } from './edit-distributor/edit-distributor.component';
import { EditModule } from 'src/app/components/edit/edit.component';
import { NewFilterModule } from 'src/app/components/new-filter/new-filter.component';
import { ServerSideTableModule } from 'src/app/components/server-side-table/server-side-table.component';
import { NewEditModule } from 'src/app/components/new-edit/new-edit.component';

@NgModule({
  declarations: [
    DistributorComponent,
    DistributorListComponent,
    CreateDistributorComponent,
    DeleteDistributorComponent,
    EditDistributorComponent,
  ],
  imports: [
    CommonModule,
    FilterBaseModule,
    TableBaseModule,
    CreateModule,
    NewEditModule,
    DeleteModule,
    NewFilterModule,
    ServerSideTableModule,
    RouterModule.forChild(distributorRoute),
    EditModule,
  ],
  exports: [
    DistributorComponent,
    DistributorListComponent,
    CreateDistributorComponent,
    DeleteDistributorComponent,
  ],
})
export class DistributorModule {}
