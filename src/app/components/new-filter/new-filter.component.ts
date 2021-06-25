import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { DynamicFormsBasicUIModule } from '@ng-dynamic-forms/ui-basic';
@Component({
  selector: 'app-new-filter',
  templateUrl: './new-filter.component.html',
  styleUrls: ['./new-filter.component.scss'],
})
export class NewFilterComponent implements OnInit {
  @Input() MY_FORM_MODEL: DynamicFormModel;
  @Output() search = new EventEmitter();
  @ContentChild('formsContent', { static: false })
  formsContent!: TemplateRef<any>;

  formModel: DynamicFormModel;
  formGroup: FormGroup;

  constructor(private formService: DynamicFormService) {}

  ngOnInit(): void {
    this.formModel = this.MY_FORM_MODEL;
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.formGroup.get('DistrictId')
  }

  searchEvent() {
    this.search.emit(this.formGroup.value);
  }
}
@NgModule({
  declarations: [NewFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsBasicUIModule,
  ],
  exports: [NewFilterComponent],
})
export class NewFilterModule {}
