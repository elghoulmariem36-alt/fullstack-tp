import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(AuthService);
  private router = inject(Router);
  open = signal(false);

  toggle() {
    this.open.update((v) => !v);
  }

  close() {
    this.open.set(false);
  }

  logout() {
    this.auth.logout();
    this.close();
    this.router.navigate(['/']);
  }
}
