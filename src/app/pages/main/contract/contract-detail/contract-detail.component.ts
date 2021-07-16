import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {
  displayedColumns = ['Gói dịch vụ', 'Số tháng', 'Gía trị', 'VAT(%)', 'Chiết khấu', 'Thời gian tặng thêm(tháng)', 'Tổng giá trị'];
  displayedHistoryColumns = ['Thời gian', 'Người cập nhật', 'Hành động'];
  packageData = [
    {
      package: 'Gói MBTT - 5 mã',
      month: '12',
      value: 6000000,
      vat: 10,
      discount: 500000,
      promotionTime: 1,
      total: 5500000
    },
    {
      package: 'Gói MBTT - 10 mã',
      month: '12',
      value: 6000000,
      vat: 10,
      discount: 500000,
      promotionTime: 1,
      total: 5500000
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

  contract = {
    Name: 'Công ty TNHH Việt An',
    TaxCode: '123456789',
    Address: 'Số 01 Xuân Thủy, Cầu Giấy, Hà Nội',
    Phone: '0986456123',
    Email: 'vietanjsc@gmail.com',
    Representative: 'Nguyễn Anh Tuấn',
    RepresentativePhone: '0987565565',
    RepresentativeEmail: 'tuan@vietanjsc.com',
    Position: 'Giám đốc'
  }

  contractForm: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.contractForm = this.fb.group({
      name: '',
      taxCode: '',
      address: '',
      phone: '',
      email: '',
      representative: '',
      representativePhone: '',
      representativeEmail: '',
      position: ''
    })
  }

  ngOnInit(): void {
    this.getContract();
  }

  getContract() {
    this.contractForm.patchValue({
      name: this.contract.Name,
      taxCode: this.contract.TaxCode,
      address: this.contract.Address,
      phone: this.contract.Phone,
      email: this.contract.Email,
      representative: this.contract.Representative,
      representativePhone: this.contract.RepresentativePhone,
      representativeEmail: this.contract.RepresentativeEmail,
      position: this.contract.Position
    })
  }

}
