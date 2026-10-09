import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Child } from './child/child';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Child],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
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

