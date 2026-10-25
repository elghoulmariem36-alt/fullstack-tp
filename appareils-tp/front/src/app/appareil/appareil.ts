import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appareil',
  imports: [FormsModule, RouterLink],
  templateUrl: './appareil.html',
  styleUrl: './appareil.css',
})
export class Appareil {
  index = input.required<number>();
  appareilName = model.required<string>();
  appareilStatus = input.required<string>();
  switchOn = output<void>();
  switchOff = output<void>();
}
