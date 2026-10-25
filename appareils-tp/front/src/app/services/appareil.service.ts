import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppareilService {
  appareilList = [
    { name: 'Washing machine', status: 'Off' },
    { name: 'TV', status: 'On' },
    { name: 'Air conditioner', status: 'Off' },
    { name: 'PC', status: 'On' },
    { name: 'Microwave', status: 'Off' },
    { name: 'Oven', status: 'On' },
    { name: 'Vacuum cleaner', status: 'Off' },
  ];

  switchOnAll() {
    this.appareilList.forEach((a) => (a.status = 'On'));
  }

  switchOffAll() {
    this.appareilList.forEach((a) => (a.status = 'Off'));
  }

  switchOnOne(index: number) {
    this.appareilList[index].status = 'On';
  }

  switchOffOne(index: number) {
    this.appareilList[index].status = 'Off';
  }
}
