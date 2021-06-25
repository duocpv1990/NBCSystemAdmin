import { PipeTransform, Pipe, NgModule } from '@angular/core';

@Pipe({ name: 'translateKeys' })
export class TranslateKeysPipe implements PipeTransform {
  transform(value, args: { key: string; label: string }[]): any {
    console.log(value);

    return args.find((a) => a.key == value)?.label;
  }
}
@NgModule({
  declarations: [TranslateKeysPipe],
  exports: [TranslateKeysPipe],
})
export class TranslateKeysPipeModule {}
