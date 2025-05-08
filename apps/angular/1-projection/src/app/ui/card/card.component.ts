import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select=".card-image"></ng-content>

      <section>
        <ng-content select=".card-list"></ng-content>
      </section>

      <ng-content select=".card-button"></ng-content>
    </div>
  `,
  imports: [],
})
export class CardComponent {
  readonly customClass = input('');
}
