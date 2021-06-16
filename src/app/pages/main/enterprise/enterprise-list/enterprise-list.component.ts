import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/components/dialog/delete/delete.component';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { CompanyService } from 'src/app/services/company.service';
import { DeleteEnterpriseComponent } from '../delete-enterprise/delete-enterprise.component';
import { EnterpriseCreateComponent } from '../enterprise-create/enterprise-create.component';
import { EnterpriseEditComponent } from '../enterprise-edit/enterprise-edit.component';

@Component({
  selector: 'app-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss']
})
export class EnterpriseListComponent implements OnInit {
  config = new EnterPriseModel();
  listFilter = [];
  data = [
    {
      "stt": "1",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 1',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "2",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 2 ',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "3",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 3',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "4",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 4',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "5",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 5',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "6",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 6',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },


  ];
  dataTable;
  listActive;
  dataSub;
  companyCode = '';
  name = '';
  status = '';
  pageNumber = 1;
  pageSize = 10;
  companies = [];

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
    this.getCompanies();
  }


  getCompanies() {
    this.companyService.getCompanies(this.pageNumber, this.pageSize, this.companyCode, this.name, this.status).subscribe(res => {
      this.companies = res.payload;
      console.log('companies', this.companies);

    }
    )
  }


  handleCallback(ev) {
    const filter = this.listFilter.filter(x => x.value);
    if (!filter.length) return this.dataSub = this.data;
    filter.forEach((x, ix) => {
      if (ix === 0) {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.data.filter(
            (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
        } else {
          this.dataSub = this.data.filter((a) => a[x.condition] == x.value);
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
      return this.dialog.open(EnterpriseCreateComponent, {
        width: '940px',
        height: '843px'
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'import') {
      return this.dialog.open(ImportExcelComponent, {
        width: '500px',
        height: '350px'
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'edit') {
      return this.dialog.open(EnterpriseEditComponent, {
        width: '940px',
        height: '843px',
        data: ev.item
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'delete') {
      return this.dialog.open(DeleteEnterpriseComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item,
          title: "Xoá doanh nghiệp",
          content: "Bạn có muốn xoá thông tin doanh nghiệp trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
      });
    }
  }

}
