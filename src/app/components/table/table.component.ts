import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() tableData: any;
    @Input() listActive?: any;
    @Output() callback = new EventEmitter<any>();
    masterSelected = false;
    checklist: any;
    checkedList: any;

    totalPage: number;
    currentPage: number = 1;
    dataSub = [];
    pageSive = 5;

    constructor() {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.totalPage = Math.ceil((this.data.length / this.pageSive));
        this.currentPage = 1;

        this.onLoadDatePagitor();
        this.checklist = changes.data.currentValue;
        this.getCheckedItemList();
    }

    ngOnInit() {
        this.totalPage = Math.ceil((this.data.length / this.pageSive));
        this.onLoadDatePagitor();
    }

    checkUncheckAll() {
        console.log('masterSelected', this.masterSelected);
        this.masterSelected = !this.masterSelected;
        for (var i = 0; i < this.checklist.length; i++) {
            this.checklist[i].isSelected = this.masterSelected;
        }
        this.getCheckedItemList();
    }
    isSelected() {
        this.masterSelected = this.checklist.every(function (item: any) {
            return item.isSelected == true;
        })
        this.getCheckedItemList();
    }

    getCheckedItemList() {
        this.checkedList = [];
        console.log(this.checklist);
        for (var i = 0; i < this.checklist.length; i++) {
            if (this.checklist[i].isSelected)
                this.checkedList.push(this.checklist[i]);
        }
        console.log(this.checkedList);

    }


    nextPage = () => {
        if (this.currentPage + 1 > this.totalPage) return;
        this.currentPage += 1;
        this.onLoadDatePagitor();
    }

    backPage = () => {
        if (this.currentPage - 1 === 0) return;
        this.currentPage -= 1;
        this.onLoadDatePagitor();
    }

    onLoadDatePagitor = () => {
        this.dataSub = this.data.filter((x, ix) => (this.currentPage - 1) * this.pageSive <= ix && ix < this.currentPage * this.pageSive);
    }

    onClickSetting = (item, type) => {
        this.callback.emit({
            item: item,
            type: type
        })
    }

    onClickBtnActive = (i) => {
        if (i.type !== 'create') {
            this.callback.emit({
                type: i.type,
                service: i.service
            })
        }

    }

    handleRouteLink = (item) => {
        this.callback.emit({
            type: 'route',
            item: item
        })
    }
    handleClickRow(item) {
        this.callback.emit({
            item: item,
            type: 'edit'
        });
    }
    clickCreate() {
        this.callback.emit({
            type: 'create'
        })
    }
    import() {
        this.callback.emit({
            type: 'import',
        })
    }
}

@NgModule({
    declarations: [
        TableComponent,
    ],
    imports: [
        CommonModule,
        MatMenuModule
    ],
    exports: [
        TableComponent
    ]
})
export class TableBaseModule { }