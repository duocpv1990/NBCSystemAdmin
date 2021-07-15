import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { KeysPipeModule } from 'src/app/utils/pipes/key.pipe';
import { TranslateKeysPipeModule } from 'src/app/utils/pipes/translate.pipe';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-server-side-table',
  templateUrl: './server-side-table.component.html',
  styleUrls: ['./server-side-table.component.scss'],
})
export class ServerSideTableComponent implements OnChanges {
  @Input() items: any;
  sizes: any[] = [];
  @ViewChildren('checkItem') checkItems: QueryList<ElementRef>;
  @Input() config: {
    key: string;
    label: string;
  }[];
  @Input() pagination;

  @Output() paginationChange = new EventEmitter();
  @Output() eventTrigger = new EventEmitter();
  isShow = false;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges() {
    if (this.items) {
      console.log('items', this.items);

      this.sizes = [
        ...this.items.map((a) => {
          let i;
          if (a.DistributorId) {
            i = a.DistributorId;
          }

          if (a.StoreId) {
            i = a.StoreId;
          }
          if (a.ProductId) {
            i = a.ProductId;
          }

          if (a.CompanyId) {
            i = a.CompanyId;
          }

          return {
            id: i,
            isChecked: false,
          };
        }),
      ];
    }

  }

  checkAll(ev) {
    this.checkItems.toArray().forEach((res) => {
      res.nativeElement.checked = ev.target.checked;
    });

    this.items.forEach((element) => {
      let a;

      if (element.ProductId) {
        a = element.ProductId;
      } else if (element.DistributorId) {
        a = element.DistributorId;
      } else {
        a = element.CompanyId;
      }

      let idx = this.sizes
        .map((a) => {
          return a.id;
        })
        .indexOf(a);
      this.sizes[idx].isChecked = ev.target.checked;
    });
    this.isShow = this.sizes.some(item => item.isChecked == true);
  }

  checkOne(ev) {
    let idx = this.sizes
      .map((a) => {
        return a.id;
      })
      .indexOf(+ev.target.value);
    this.sizes[idx].isChecked = ev.target.checked;
    this.isShow = this.sizes.some(item => item.isChecked == true);
  }

  isAllChecked() {
    return this.sizes.every((_) => _.isChecked);
  }

  getPage(ev) {
    console.log(ev);
    this.paginationChange.emit(ev);
  }

  addEmit() {
    this.eventTrigger.emit({
      type: 'create',
    });
  }

  delete() {
    this.eventTrigger.emit({
      type: 'delete',
      dataDelete: this.sizes,
    });
  }

  openEdit(id) {
    console.log(id);

    this.eventTrigger.emit({
      type: 'edit',
      data: id,
    });
  }

  fileName = 'ExcelSheet.xlsx';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  updateStatus(i, id) {
    if (i == 1) {
      this.eventTrigger.emit({
        type: 'update-status',
        data: 2,
        id,
      });
    } else {
      this.eventTrigger.emit({
        type: 'update-status',
        data: 1,
        id,
      });
    }
  }

  updateType(i, id) {
    if (i == 1) {
      this.eventTrigger.emit({
        type: 'update-type',
        data: 2,
        id,
      });
    } else {
      this.eventTrigger.emit({
        type: 'update-type',
        data: 1,
        id,
      });
    }
  }
}

@NgModule({
  declarations: [ServerSideTableComponent],
  imports: [
    CommonModule,
    KeysPipeModule,
    MatIconModule,
    TranslateKeysPipeModule,
    MatMenuModule,
    NgxPaginationModule,
  ],
  exports: [ServerSideTableComponent],
})
export class ServerSideTableModule { }
