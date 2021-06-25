import { PipeTransform, Pipe, NgModule } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    if (value) {
      return Object.keys(value);
    }

    return value;
  }
}
@NgModule({
  declarations: [KeysPipe],
  exports: [KeysPipe],
})
export class KeysPipeModule {}
