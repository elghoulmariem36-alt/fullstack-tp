import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appareil } from '../appareil/appareil';
import { AppareilModel, Room } from '../models/appareil.model';
import { AppareilService } from '../services/appareil.service';

type StatusFilter = 'all' | 'On' | 'Off';

@Component({
  selector: 'app-appareil-dashboard',
  imports: [Appareil, FormsModule],
  templateUrl: './appareil-dashboard.html',
  styleUrl: './appareil-dashboard.css',
})
export class AppareilDashboard implements OnInit {
  private service = inject(AppareilService);

  appareils = signal<AppareilModel[]>([]);
  rooms = signal<Room[]>([]);
  loading = signal(true);
  error = signal('');
  allowed = signal(false);

  statusFilter = signal<StatusFilter>('all');
  roomFilter = signal('');
  query = signal('');

  form: { name: string; status: 'On' | 'Off'; room: string } = { name: '', status: 'Off', room: '' };

  total = computed(() => this.appareils().length);
  onCount = computed(() => this.appareils().filter((a) => a.status === 'On').length);
  offCount = computed(() => this.total() - this.onCount());

  visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.appareils().filter(
      (a) =>
        (this.statusFilter() === 'all' || a.status === this.statusFilter()) &&
        (!this.roomFilter() || a.room?._id === this.roomFilter()) &&
        (!q || a.name.toLowerCase().includes(q)),
    );
  });

  private fail = () => {
    this.error.set('The request failed. The list has been refreshed.');
    this.load();
  };

  constructor() {
    setTimeout(() => this.allowed.set(true), 4000);
  }

  ngOnInit() {
    this.service.getRooms().subscribe({ next: (r) => this.rooms.set(r), error: () => undefined });
    this.load();
  }

  load() {
    this.service.getAppareils().subscribe({
      next: (list) => {
        this.appareils.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load the appliances.');
        this.loading.set(false);
      },
    });
  }

  private replace(updated: AppareilModel) {
    this.appareils.update((list) => list.map((a) => (a._id === updated._id ? updated : a)));
  }

  add() {
    const body = { name: this.form.name.trim(), status: this.form.status, room: this.form.room || null };
    if (!body.name) return;
    this.form = { name: '', status: 'Off', room: '' };
    this.service.addAppareil(body).subscribe({
      next: (created) => this.appareils.update((list) => [...list, created]),
      error: this.fail,
    });
  }

  toggle(a: AppareilModel) {
    const status: 'On' | 'Off' = a.status === 'On' ? 'Off' : 'On';
    this.service
      .updateAppareil(a._id, { name: a.name, status })
      .subscribe({ next: (u) => this.replace(u), error: this.fail });
  }

  rename(a: AppareilModel, name: string) {
    this.service
      .updateAppareil(a._id, { name, status: a.status })
      .subscribe({ next: (u) => this.replace(u), error: this.fail });
  }

  remove(a: AppareilModel) {
    if (!confirm(`Delete "${a.name}"?`)) return;
    this.service.deleteAppareil(a._id).subscribe({
      next: () => this.appareils.update((list) => list.filter((x) => x._id !== a._id)),
      error: this.fail,
    });
  }

  switchAllOn() {
    this.service.switchAll('On').subscribe({ next: () => this.load(), error: this.fail });
  }

  switchAllOff() {
    if (!confirm('Are you sure you want to switch off all your appliances?')) return;
    this.service.switchAll('Off').subscribe({ next: () => this.load(), error: this.fail });
  }
}
