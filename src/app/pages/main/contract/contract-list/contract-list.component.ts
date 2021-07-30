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
      Status: 2,
      Approve: 2
    },
    {
      ID: 456,
      Name: 'Công ty TNHH Việt An',
      ServicePackage: 'Gói MBTT cơ bản - 5 mã',
      Value: '20.000.000',
      Creater: 'Nguyễn Văn Sơn',
      Type: 2,
      ApprovedbBy: 'Nguyễn Văn Sơn',
      Status: 1,
      Approve: 1
    },
    {
      ID: 789,
      Name: 'Công ty TNHH Việt An',
      ServicePackage: 'Gói MBTT cơ bản - 5 mã',
      Value: '20.000.000',
      Creater: 'Nguyễn Văn Sơn',
      Type: 3,
      ApprovedbBy: 'Nguyễn Văn Sơn',
      Status: 2,
      Approve: 2
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
    this.listFilter[2].data = [
      {
        name: 'Gói MBTT - 5 mã',
        value: 1
      },
      {
        name: 'Gói MBTT - 10 mã',
        value: 2
      },
      {
        name: 'Gói MBTT - 15 mã',
        value: 2
      },
      {
        name: 'Gói MBTT - 20 mã',
        value: 3
      }
    ];
    this.listFilter[5].data = [
      {
        name: 'Ký mới',
        value: 1
      },
      {
        name: 'Nâng cấp',
        value: 2
      },
      {
        name: 'Tái ký',
        value: 3
      }
    ];
    this.listFilter[6].data = [
      {
        name: 'Đã duyệt',
        value: 1
      },
      {
        name: 'Chưa duyệt',
        value: 2
      },
      {
        name: 'Đã thanh toán',
        value: 3
      },
      {
        name: 'Đã hủy',
        value: 4
      }
    ]
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
    console.log(ev.item);
    switch (ev.type) {
      case 'create':
        this.router.navigate(['contract/create']);
        break;
      case 'export':
        this.exportExcel();
        break;
      case 'route':
        localStorage.setItem('contractStatus', ev.item.Status);
        this.router.navigate([`contract/${ev.item.ID}`]);
    }
  }

  exportExcel() {
    this.exportService.exportExcel(this.accounts, 'accounts')
  }

}
