import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DynamicInputModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { from } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';
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
    { key: 'index', label: 'STT' },
    {
      key: 'CompanyCode',
      label: 'Mã doanh nghiệp',
    },
    {
      key: 'GLN',
      label: 'Mã địa điểm toàn cầu',
    },
    {
      key: 'Name',
      label: 'Tên doanh nghiệp',
    },
    {
      key: 'Status',
      label: 'Trạng thái',
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
    id: 'distributor',
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
  ) {}

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.getCompanies();
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
      });

      this.dataSub = res.payload;

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
        .subscribe((result) => {});
    }
    if (ev.type === 'import') {
      return this.dialog
        .open(ImportExcelComponent, {
          width: '500px',
          height: '350px',
        })
        .afterClosed()
        .subscribe((result) => {});
    }
    if (ev.type === 'edit') {
      return this.dialog
        .open(EnterpriseEditComponent, {
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
      from(ev.dataDelete)
        .pipe(
          filter((res: any) => res.isChecked === true),
          concatMap((res) => this.companyService.deleteCompany(res.id))
        )
        .subscribe({
          complete: () => {
            this.getCompanies();
          },
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
