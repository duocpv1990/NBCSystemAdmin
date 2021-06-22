import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormatDateService } from '../../services/format-date.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() listFilter: any;
  @Input() data: any;
  @Output() callback = new EventEmitter<any>();
  companyCode = '';
  name = '';
  status = 1;
  constructor(private serviceDate: FormatDateService) {}

  onChangeValueDate = (valueDate, item) => {
    switch (item.condition) {
      case 'companyCode':
        this.companyCode = item.value;
        break;
      case 'name':
        this.name = item.value;
        break;
      case 'status':
        this.status = item.value;
        break;
      default:
        break;
    }
    if (item.type === 'date') {
      item.value = this.serviceDate.formatDate(valueDate, 'MM-DD-YYYY');
    } else {
      item.value = valueDate;
    }
  };

  emitEventFilter() {
    this.callback.emit({
      companyCode: this.companyCode,
      name: this.name,
      status: this.status,
    });
  }
}

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule],
  exports: [FilterComponent],
})
export class FilterBaseModule {}
