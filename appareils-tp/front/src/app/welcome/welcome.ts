import { Component } from '@angular/core';
import { Premier } from '../premier/premier';

@Component({
  selector: 'app-welcome',
  imports: [Premier],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {}
