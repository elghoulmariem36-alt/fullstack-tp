import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  states = input<string[]>([]);
  selected = output<string>();

  select(state: string) {
    this.selected.emit(state);
  }
}
