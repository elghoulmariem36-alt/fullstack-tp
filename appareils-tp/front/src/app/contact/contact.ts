import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  topics = ['General question', 'Report a problem', 'Feature request'];
  form = { name: '', email: '', topic: this.topics[0], message: '' };
  sent = signal(false);
  sentName = signal('');

  submit() {
    this.sentName.set(this.form.name.trim());
    console.log('Contact form submitted:', this.form);
    this.sent.set(true);
    this.form = { name: '', email: '', topic: this.topics[0], message: '' };
  }

  again() {
    this.sent.set(false);
  }
}
