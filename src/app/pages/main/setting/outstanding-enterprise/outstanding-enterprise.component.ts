import { Component, OnInit } from '@angular/core';
import { OutstandingEnterpriseModel } from 'src/app/models/outstanding-enterprise.model';

@Component({
  selector: 'app-outstanding-enterprise',
  templateUrl: './outstanding-enterprise.component.html',
  styleUrls: ['./outstanding-enterprise.component.scss']
})
export class OutstandingEnterpriseComponent implements OnInit {
  config = new OutstandingEnterpriseModel;
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
