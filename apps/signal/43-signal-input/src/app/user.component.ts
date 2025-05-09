import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  InputSignalWithTransform,
  OnChanges,
} from '@angular/core';

type Category = 'Youth' | 'Junior' | 'Open' | 'Senior';
const ageToCategory = (age: number): Category => {
  if (age < 10) return 'Youth';
  else if (age < 18) return 'Junior';
  else if (age < 35) return 'Open';
  return 'Senior';
};

@Component({
  selector: 'app-user',
  imports: [TitleCasePipe],
  template: `
    {{ fullName | titlecase }} plays tennis in the {{ category }} category!!
  `,
  host: {
    class: 'text-xl text-green-800',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnChanges {
  name: InputSignal<string> = input.required<string>();
  lastName: InputSignal<string | undefined> = input<string>();
  age: InputSignalWithTransform<number, string | number> = input(0, {
    transform: (value: number | string): number => {
      const num: number =
        typeof value === 'string' ? Number.parseInt(value) : value;
      return isNaN(num) ? 0 : num;
    },
  });

  fullName = '';
  category: Category = 'Junior';

  ngOnChanges(): void {
    this.fullName = `${this.name()} ${this.lastName() ?? ''}`;
    this.category = ageToCategory(Number(this.age()) ?? 0);
  }
}
