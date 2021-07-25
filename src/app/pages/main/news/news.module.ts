import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { newsRoute } from './news.routes';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsUpdateComponent } from './news-update/news-update.component';
import { NewsDeleteComponent } from './news-delete/news-delete.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [NewsComponent, NewsListComponent, NewsAddComponent, NewsUpdateComponent, NewsDeleteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(newsRoute),
    FilterBaseModule,
    TableBaseModule,
    AngularEditorModule,
    MatIconModule
  ]
})
export class NewsModule { }
