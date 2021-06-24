import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { DistributorModel } from 'src/app/models/distributor.model';
import { DistributorService } from 'src/app/services/distributor.service';
import { CreateDistributorComponent } from '../create-distributor/create-distributor.component';
import { EditDistributorComponent } from '../edit-distributor/edit-distributor.component';
import { DeleteDistributorComponent } from '../delete-distributor/delete-distributor.component';
@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.scss']
})
export class DistributorListComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private distributorService: DistributorService
  ) { }
  config = new DistributorModel();
  listFilter = [];

  dataTable;
  listActive;
  dataSub;
  distributors = [];
  pageNumber = 1;
  pageSize = 50;
  provinceId = '';
  name = '';
  count: number;

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.getDistributor();
  }


  getDistributor() {
    this.distributorService.getDistributors(this.pageNumber, this.pageSize, this.name, this.provinceId).subscribe(res => {
      this.distributors = res.payload;
      this.count = res.count;
      this.distributors.forEach((item, index) => {
        item['index'] = index + 1;
      })
    })
  }

  handleCallback(ev) {
    const filter = this.listFilter.filter(x => x.value);
    if (!filter.length) return this.dataSub = this.distributors;
    filter.forEach((x, ix) => {
      if (ix === 0) {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.distributors.filter(
            (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
        } else {
          this.dataSub = this.distributors.filter((a) => a[x.condition] == x.value);
        }
      } else {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.dataSub.filter(
            (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
        } else {
          this.dataSub = this.dataSub.filter((a) => a[x.condition] == x.value);
        }
      }

    });

  }
  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog.open(CreateDistributorComponent, {
        width: '940px',
        height: '843px'
      }).afterClosed().subscribe(result => {
        this.getDistributor();
      });
    }
    if (ev.type === 'edit') {
      return this.dialog.open(EditDistributorComponent, {
        width: '940px',
        height: '843px',
        data: ev.item
      }).afterClosed().subscribe(result => {
        this.getDistributor();
      });
    }
    if (ev.type === 'import') {
      return this.dialog.open(ImportExcelComponent, {
        width: '500px',
        height: '350px'
      }).afterClosed().subscribe(result => {
        this.getDistributor();
      });
    }
    if (ev.type === 'delete') {
      return this.dialog.open(DeleteDistributorComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item,
          title: "Xoá nhà phân phối",
          content: "Bạn có muốn xoá thông tin nhà phân phối trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
        this.getDistributor();
      });
    }

  }

}
