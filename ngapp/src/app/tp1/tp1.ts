import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from '../child/child';

@Component({
  selector: 'app-tp1',
  imports: [Child],
  templateUrl: './tp1.html',
  styleUrl: './tp1.css',
})
export class Tp1 {
  private router = inject(Router);
  states = ['Tozeur', 'Tunis', 'Nabeul'];
  chosen = '';

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  gotoContact() {
    this.router.navigate(['/contact/123']);
  }

  onSelected(state: string) {
    this.chosen = state;
  }
}
