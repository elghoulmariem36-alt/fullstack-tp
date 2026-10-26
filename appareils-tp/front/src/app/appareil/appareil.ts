import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppareilModel } from '../models/appareil.model';

@Component({
  selector: 'app-appareil',
  imports: [FormsModule, RouterLink],
  templateUrl: './appareil.html',
  styleUrl: './appareil.css',
})
export class Appareil {
  appareil = input.required<AppareilModel>();
  switchOn = output<void>();
  switchOff = output<void>();
  remove = output<void>();
  rename = output<string>();

  editing = signal(false);
  draft = '';

  startEdit() {
    this.draft = this.appareil().name;
    this.editing.set(true);
  }

  save() {
    const name = this.draft.trim();
    if (name) this.rename.emit(name);
    this.editing.set(false);
  }
}
