import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppareilModel } from '../models/appareil.model';
import { applianceIcon } from '../shared/appliance-icon';

@Component({
  selector: 'app-appareil',
  imports: [FormsModule, RouterLink],
  templateUrl: './appareil.html',
  styleUrl: './appareil.css',
})
export class Appareil {
  appareil = input.required<AppareilModel>();
  toggled = output<void>();
  renamed = output<string>();
  removed = output<void>();

  icon = computed(() => applianceIcon(this.appareil().name));
  editing = signal(false);
  draft = '';

  startEdit() {
    this.draft = this.appareil().name;
    this.editing.set(true);
  }

  save() {
    const name = this.draft.trim();
    if (name) this.renamed.emit(name);
    this.editing.set(false);
  }
}
