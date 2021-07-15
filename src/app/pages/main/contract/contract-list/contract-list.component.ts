import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractModel } from 'src/app/models/contract.model';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  listFilter;
  config = new ContractModel();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  pageNumber = 1;
  pageSize = 50;
  name = '';
  status = '';
  createdBy = '';
  roleId = '';
  accounts = [];
  timer;
  contractData = [
    {
      ID: 123,
      Name: 'Công ty TNHH Việt An',
      ServicePackage: 'Gói MBTT cơ bản - 5 mã',
      Value: '20.000.000',
      Creater: 'Nguyễn Văn Sơn',
      Type: 1,
      ApprovedbBy: 'Nguyễn Văn Sơn',
      Status: 1
    },
    {
      ID: 456,
      Name: 'Công ty TNHH Việt An',
      ServicePackage: 'Gói MBTT cơ bản - 5 mã',
      Value: '20.000.000',
      Creater: 'Nguyễn Văn Sơn',
      Type: 1,
      ApprovedbBy: 'Nguyễn Văn Sơn',
      Status: 1
    },
    {
      ID: 789,
      Name: 'Công ty TNHH Việt An',
      ServicePackage: 'Gói MBTT cơ bản - 5 mã',
      Value: '20.000.000',
      Creater: 'Nguyễn Văn Sơn',
      Type: 1,
      ApprovedbBy: 'Nguyễn Văn Sơn',
      Status: 1
    }
  ];

  constructor(
    private exportService: ExportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
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

  handleCallbackTable(ev) {
    console.log(ev);
    switch (ev.type) {
      case 'create':
        this.router.navigate(['contract/create']);
        break;
      case 'export':
        this.exportExcel();
        break;

    }
  }

  exportExcel() {
    this.exportService.exportExcel(this.accounts, 'accounts')
  }

}