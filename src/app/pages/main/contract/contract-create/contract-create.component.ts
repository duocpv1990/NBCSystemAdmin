import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.scss']
})
export class ContractCreateComponent implements OnInit {

  displayedColumns = ['Gói dịch vụ', 'Số tháng', 'Gía trị', 'VAT(%)', 'Chiết khấu', 'Thời gian tặng thêm(tháng)', 'Tổng giá trị'];
  packageData = [
    {
      package: 'Gói MBTT - 5 mã',
      month: '',
      value: '',
      vat: '',
      discount: '',
      promotionTime: '',
      total: ''
    }
  ];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    outline: false,
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'customClasses',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
        'insertImage',
        'insertVideo',
      ]
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  addData() {
    this.packageData.push(
      {
        package: 'Gói MBTT - 10 mã',
        month: '',
        value: '',
        vat: '',
        discount: '',
        promotionTime: '',
        total: ''
      }
    )
  }

}
