import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  gotoContact() {
    this.router.navigate(['/contact']);
  }
}

