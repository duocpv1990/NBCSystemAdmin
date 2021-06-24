import { PipeTransform, Pipe, NgModule } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    return Object.keys(value);
  }
}
@NgModule({
  declarations: [KeysPipe],
  exports: [KeysPipe],
})
export class KeysPipeModule {}
