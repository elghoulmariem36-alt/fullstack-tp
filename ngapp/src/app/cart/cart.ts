import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, MAX_PER_LINE } from './cart.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart = inject(CartService);

  maxFor(stock: number): number {
    return Math.min(stock, MAX_PER_LINE);
  }

  confirmClear() {
    if (confirm('Remove every item from your cart?')) {
      this.cart.clear();
    }
  }
}
