import { Component, OnInit } from '@angular/core';
import { BannerModel } from 'src/app/models/banner.model';
import { OutstandingProductModel } from 'src/app/models/outstanding-product.model';

@Component({
  selector: 'app-setting-banner',
  templateUrl: './setting-banner.component.html',
  styleUrls: ['./setting-banner.component.scss']
})
export class SettingBannerComponent implements OnInit {
  config = new BannerModel;
  listFilter;
  dataTable;
  listActive;
  dataSub;
  constructor() { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = []; 
  }
  handleFilterCallback(ev){


  }
  handleCallbackTable(ev){

  }

}
