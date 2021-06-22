import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormatDateService } from '../../services/format-date.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() listFilter: any;
  @Input() data: any;
  @Input() typeForms: string;
  @Output() callback = new EventEmitter<any>();
  companyCode = '';
  name = '';
  status = 1;
  constructor(private serviceDate: FormatDateService) {}

  onChangeValueDate = (valueDate, item) => {
    if (item.type === 'date') {
      item.value = this.serviceDate.formatDate(valueDate, 'MM-DD-YYYY');
    } else {
      item.value = valueDate;
    }
    if (this.typeForms !== 'enterprise') {
      this.callback.emit(item);
    }
  };

  emitEventFilter() {
    if (this.typeForms == 'enterprise') {
      this.callback.emit({
        companyCode: this.companyCode,
        name: this.name,
        status: this.status,
      });
    }
  }
}

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule, FormsModule],
  exports: [FilterComponent],
})
export class FilterBaseModule {}
