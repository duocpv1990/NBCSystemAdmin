import { Component, OnInit } from '@angular/core';
import { OutstandingProductModel } from 'src/app/models/outstanding-product.model';

@Component({
  selector: 'app-outstanding-product',
  templateUrl: './outstanding-product.component.html',
  styleUrls: ['./outstanding-product.component.scss']
})
export class OutstandingProductComponent implements OnInit {

  config = new OutstandingProductModel;
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
