export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  stock: number;
  category: Category;
}
