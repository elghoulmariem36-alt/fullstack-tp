import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appareil } from '../appareil/appareil';
import { AppareilModel } from '../models/appareil.model';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-dashboard',
  imports: [Appareil, FormsModule],
  templateUrl: './appareil-dashboard.html',
  styleUrl: './appareil-dashboard.css',
})
export class AppareilDashboard implements OnInit {
  private service = inject(AppareilService);

  appareils = signal<AppareilModel[]>([]);
  loading = signal(true);
  error = signal('');
  allowed = signal(false);
  form: { name: string; status: 'On' | 'Off' } = { name: '', status: 'Off' };

  constructor() {
    setTimeout(() => this.allowed.set(true), 4000);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAppareils().subscribe({
      next: (list) => {
        this.appareils.set(list);
        this.error.set('');
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load the appliances');
        this.loading.set(false);
      },
    });
  }

  private fail = () => this.error.set('The request failed');

  add() {
    const body = { ...this.form };
    this.form = { name: '', status: 'Off' };
    this.service.addAppareil(body).subscribe({ next: () => this.load(), error: this.fail });
  }

  setStatus(a: AppareilModel, status: 'On' | 'Off') {
    this.service
      .updateAppareil(a._id, { name: a.name, status })
      .subscribe({ next: () => this.load(), error: this.fail });
  }

  rename(a: AppareilModel, name: string) {
    this.service
      .updateAppareil(a._id, { name, status: a.status })
      .subscribe({ next: () => this.load(), error: this.fail });
  }

  remove(a: AppareilModel) {
    if (!confirm(`Delete "${a.name}"?`)) return;
    this.service.deleteAppareil(a._id).subscribe({ next: () => this.load(), error: this.fail });
  }

  onSwitchOnAll() {
    this.service.switchAll('On').subscribe({ next: () => this.load(), error: this.fail });
  }

  onSwitchOffAll() {
    if (!confirm('Are you sure you want to switch off all your appliances?')) return;
    this.service.switchAll('Off').subscribe({ next: () => this.load(), error: this.fail });
  }
}
