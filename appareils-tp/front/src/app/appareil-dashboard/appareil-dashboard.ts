import { Component, OnInit, inject, signal } from '@angular/core';
import { Appareil } from '../appareil/appareil';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-dashboard',
  imports: [Appareil],
  templateUrl: './appareil-dashboard.html',
  styleUrl: './appareil-dashboard.css',
})
export class AppareilDashboard implements OnInit {
  private appareilService = inject(AppareilService);
  appareilList: { name: string; status: string }[] = [];
  allowed = signal(false);

  constructor() {
    setTimeout(() => this.allowed.set(true), 4000);
  }

  ngOnInit() {
    this.appareilList = this.appareilService.appareilList;
  }

  onSwitchOnAll() {
    this.appareilService.switchOnAll();
  }

  onSwitchOffAll() {
    if (confirm('Are you sure you want to switch off all your appliances?')) {
      this.appareilService.switchOffAll();
    }
  }

  onSwitchOn(i: number) {
    this.appareilService.switchOnOne(i);
  }

  onSwitchOff(i: number) {
    this.appareilService.switchOffOne(i);
  }
}
