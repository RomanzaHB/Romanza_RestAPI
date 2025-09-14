export interface Product {
  id: number;
  name: string;
  price: number;
}

// shared in-memory store (only for local/dev simulation)
export const products: Product[] = [
  { id: 1, name: 'Product 1', price: 10000 },
  { id: 2, name: 'Product 2', price: 20000 },
];

export function getNextID() {
  return products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
}
