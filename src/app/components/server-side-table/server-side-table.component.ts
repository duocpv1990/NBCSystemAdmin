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
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges() {
    console.log(this.pagination);

    if (this.items) {
      this.sizes = [
        ...this.items.map((a) => ({
          ProductId: a.ProductId,
          isChecked: false,
        })),
      ];
    }
  }

  checkAll(ev) {
    this.checkItems.toArray().forEach((res) => {
      res.nativeElement.checked = ev.target.checked;
    });

    this.items.forEach((element) => {
      let idx = this.sizes.map((a) => a.ProductId).indexOf(element.ProductId);
      this.sizes[idx].isChecked = ev.target.checked;
    });
    // this.sizes.forEach((x) => (x.isChecked = ev.target.checked));
  }

  checkOne(ev) {
    let idx = this.sizes.map((a) => a.ProductId).indexOf(+ev.target.value);
    this.sizes[idx].isChecked = ev.target.checked;

    console.log(this.sizes);
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
export class ServerSideTableModule {}
