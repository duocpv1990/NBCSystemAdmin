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
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.scss'],
})
export class NewEditComponent implements OnInit {
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
  }
}

@NgModule({
  declarations: [NewEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsBasicUIModule,
  ],
  exports: [NewEditComponent],
})
export class NewEditModule {}
