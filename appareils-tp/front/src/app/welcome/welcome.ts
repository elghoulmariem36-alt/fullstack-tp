import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  private service = inject(AppareilService);

  total = signal(0);
  active = signal(0);
  roomCount = signal(0);
  failed = signal(false);

  constructor() {
    this.service.getAppareils().subscribe({
      next: (list) => {
        this.total.set(list.length);
        this.active.set(list.filter((a) => a.status === 'On').length);
      },
      error: () => this.failed.set(true),
    });
    this.service.getRooms().subscribe({
      next: (rooms) => this.roomCount.set(rooms.length),
      error: () => this.failed.set(true),
    });
  }
}
