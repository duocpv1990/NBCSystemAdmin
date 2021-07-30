import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { NewsModel } from 'src/app/models/news.model';
import { ExportService } from 'src/app/services/export.service';
import { NewsAddComponent } from '../news-add/news-add.component';
import { NewsDeleteComponent } from '../news-delete/news-delete.component';
import { NewsUpdateComponent } from '../news-update/news-update.component';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  listFilter;
  config = new NewsModel();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  data = [];
  pageNumber = 1;
  pageSize = 50;
  name = '';
  status = '';
  createdBy = '';
  roleId = '';
  newsList = [
    {
      Title: 'KH không đủ kinh tế',
      View: '123',
      Creater: 'Admin',
      PublishDate: '24/07/2021',
      PostRemoveDate: '26/07/2021',
      Editer: 'Admin',
      Status: 'Hoạt động'
    }
  ];
  timer;

  constructor(
    private dialog: MatDialog,
    private exportService: ExportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
    this.listFilter[2].data = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Khóa',
        value: 0
      }
    ];
  }

  handleFilterCallback(event) {
    console.log(event);
    if (event.condition === 'Name') {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.name = event.value;

      }, 100);
    }

  }

  exportExcel() {
    this.exportService.exportExcel(this.newsList, 'accounts')
  }

  handleCallbackTable(ev) {
    console.log(ev);
    switch (ev.type) {
      case 'create':
        this.router.navigate(['news/create']);
        break;
      case 'import':
        this.dialog.open(ImportExcelComponent, {
          width: '500px',
          height: '350px'
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'edit':
        this.router.navigate(['news/update'])
        break;
      case 'delete':
        this.dialog.open(NewsDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.item,
            title: "Xoá bài viết",
            content: "Bạn có muốn xoá bài viết trên hệ thống?"
          }
        }).afterClosed().subscribe(result => {

        });
        break;
      case 'export':
        this.exportExcel();
        break;

    }
  }

}
