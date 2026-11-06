import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { categoryLabel, stockLabel } from '../shared/format';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  layout = input<'grid' | 'list'>('grid');
  category = computed(() => categoryLabel(this.product().category.name));
  stock = computed(() => stockLabel(this.product().stock));
}
