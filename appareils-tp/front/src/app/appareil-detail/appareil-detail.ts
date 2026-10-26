import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppareilModel } from '../models/appareil.model';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './appareil-detail.html',
  styleUrl: './appareil-detail.css',
})
export class AppareilDetail {
  private route = inject(ActivatedRoute);
  private service = inject(AppareilService);

  appareil = signal<AppareilModel | null>(null);
  loading = signal(true);
  error = signal('');

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.loading.set(true);
      this.error.set('');
      this.service.getAppareil(params.get('id') ?? '').subscribe({
        next: (a) => {
          this.appareil.set(a);
          this.loading.set(false);
        },
        error: () => {
          this.appareil.set(null);
          this.error.set('Appliance not found');
          this.loading.set(false);
        },
      });
    });
  }
}
