import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DynamicInputModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { from } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';
import { DeleteComponent } from 'src/app/components/dialog/delete/delete.component';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { CompanyService } from 'src/app/services/company.service';
import { EnterpriseCreateComponent } from '../enterprise-create/enterprise-create.component';
import { EnterpriseEditComponent } from '../enterprise-edit/enterprise-edit.component';
import { EnterpriseDetailComponent } from '../enterprise-detail/enterprise-detail.component';
import { DeleteEnterpriseComponent } from '../delete-enterprise/delete-enterprise.component';

@Component({
  selector: 'app-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss'],
})
export class EnterpriseListComponent implements OnInit {
  config = new EnterPriseModel();
  listFilter = [];
  dataTable;
  listActive;
  dataSub;
  companyCode = '';
  name = '';
  status = '';
  pageNumber = 1;
  pageSize = 10000;
  companies = [];
  configHeader = [
    // { key: 'index', label: 'STT' },
    {
      key: 'CompanyCode',
      label: 'Mã doanh nghiệp',
    },
    {
      key: 'GLN',
      label: 'Mã địa điểm toàn cầu GLN',
    },
    {
      key: 'Name',
      label: 'Tên doanh nghiệp',
    },
    {
      key: 'ServicePackage',
      label: 'Gói dịch vụ',
    },

    {
      key: 'Approve',
      label: 'Phê duyệt',
    },
    {
      key: 'Type',
      label: 'Trình trạng',
    },
  ];
  formModel = [
    new DynamicInputModel({
      id: 'name',
      label: 'Tên doanh nghiệp',
    }),
    new DynamicInputModel({
      id: 'companyCode',
      label: 'Mã doanh nghiệp',
    }),
    new DynamicInputModel({
      id: 'GLN',
      label: 'Mã địa điểm toàn cầu',
    }),
    new DynamicSelectModel({
      id: 'status',
      label: 'Trạng thái',
      value: '',
      options: [
        {
          value: '',
          label: 'Tất cả',
        },
        {
          value: '2',
          label: 'Hoạt động',
        },
        {
          value: '1',
          label: 'Không hoạt động',
        },
      ],
    }),
    new DynamicSelectModel({
      id: 'type',
      label: 'Tình trạng',
      value: '',
      options: [
        {
          value: '',
          label: 'Tất cả',
        },
        {
          value: '2',
          label: 'Đã duyệt',
        },
        {
          value: '1',
          label: 'Chưa duyệt',
        },
      ],
    }),
  ];

  pagination = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: null,
    id: 'company',
  };

  filter = {
    name: '',
    companyCode: '',
    status: '',
    type: '',
    pageNumber: 1,
    pageSize: 10,
  };

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getCompanies();
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
  }

  changePage(ev) {
    this.filter.pageNumber = ev;
    this.getCompanies(this.filter);
  }

  getCompanies(filter = this.filter) {
    for (var propName in filter) {
      if (filter[propName] === null || filter[propName] === undefined) {
        filter[propName] = '';
      }
    }

    if (!filter.pageNumber) {
      filter.pageNumber = this.filter.pageNumber;
    }

    if (!filter.pageSize) {
      filter.pageSize = this.filter.pageSize;
    }

    this.filter = filter;
    console.log(this.filter);

    this.companyService.getCompanies(this.filter).subscribe((res: any) => {
      res.payload.forEach((el) => {
        delete el.CreatedOn;
        delete el.UpdatedOn;
        delete el.CertificateNumber;
        delete el.Status;
        el.ServicePackage = 'Gói MBTT cơ bản - 5 mã';
        el.Approve = '';
      });

      this.dataSub = res.payload;
      console.log('data', this.dataSub);

      this.pagination = {
        itemsPerPage: this.filter.pageSize,
        currentPage: this.filter.pageNumber,
        totalItems: res.count,
        id: 'company',
      };
      // this.distributors.forEach((item, index) => {
      //   item['index'] = index + 1;
      // });
    });
  }

  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog
        .open(EnterpriseCreateComponent, {
          width: '940px',
          height: '843px',
        })
        .afterClosed()
        .subscribe((result) => {
          this.getCompanies();
        });
    }
    if (ev.type === 'import') {
      return this.dialog
        .open(ImportExcelComponent, {
          width: '500px',
          height: '350px',
        })
        .afterClosed()
        .subscribe((result) => {
          this.getCompanies();
        });
    }
    if (ev.type === 'edit') {
      return this.dialog
        .open(EnterpriseDetailComponent, {
          panelClass: 'custom-dialog-container',
          width: '940px',
          height: '843px',
          data: ev.data,
        })
        .afterClosed()
        .subscribe((result) => {
          this.getCompanies();
        });
    }
    if (ev.type === 'delete') {
      return this.dialog.open(DeleteEnterpriseComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.dataDelete,
          title: "Xoá khách hàng",
          content: "Bạn có muốn xoá khách hàng trên hệ thống?"
        }
      }).afterClosed()
        .subscribe((result) => {
          this.getCompanies();
        });

    }
    if (ev.type === 'update-type') {
      this.companyService
        .updateCompany(ev.id, {
          Type: ev.data,
        })
        .subscribe(() => {
          this.getCompanies();
        });
    }
    if (ev.type === 'update-status') {
      this.companyService
        .updateCompany(ev.id, {
          Status: ev.data,
        })
        .subscribe(() => {
          this.getCompanies();
        });
    }
    if (ev.type === 'approve') {
      this.companyService
        .updateCompany(ev.item.CompanyId, { Type: 2 })
        .subscribe((res) => {
          this.getCompanies();
        });
    }
  }
}
