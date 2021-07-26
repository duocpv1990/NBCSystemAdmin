import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { bannerRoute } from './banner.routes';
import { BannerComponent } from './banner.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerCreateComponent } from './banner-create/banner-create.component';
import { BannerDeleteComponent } from './banner-delete/banner-delete.component';
import { BannerUpdateComponent } from './banner-update/banner-update.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { DeleteModule } from 'src/app/components/dialog/delete/delete.component';

@NgModule({
  declarations: [
    BannerComponent,
    BannerListComponent,
    BannerCreateComponent,
    BannerDeleteComponent,
    BannerUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(bannerRoute),
    FilterBaseModule,
    TableBaseModule,
    MatIconModule,
    DeleteModule
  ]
})
export class BannerModule { }
