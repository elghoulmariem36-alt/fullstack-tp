import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  id: string | null = null;
  private route = inject(ActivatedRoute);

  formData = {
    name: '',
    email: '',
  };

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
  }
}
