import type { NextApiRequest, NextApiResponse } from 'next';

import { Product, products, getNextID } from './data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // disable caching to avoid 304 responses during dev
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, price } = req.body;
    if (!name || price === undefined || price === null)
      return res.status(400).json({ error: 'Missing name or price' });
    const newProduct: Product = {
      id: getNextID(),
      name,
      price: Number(price),
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } else if (req.method === 'PUT') {
    // allow update via body { id, name, price } as fallback
    const { id, name, price } = req.body as {
      id?: number;
      name?: string;
      price?: number;
    };
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const idx = products.findIndex((p) => p.id === Number(id));
    if (idx === -1) return res.status(404).json({ error: 'Product not found' });
    products[idx] = {
      id: Number(id),
      name: name ?? products[idx].name,
      price: price === undefined ? products[idx].price : Number(price),
    };
    res.status(200).json(products[idx]);
  } else if (req.method === 'DELETE') {
    // allow delete via body { id } as fallback
    const { id } = req.body as { id?: number };
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const idx = products.findIndex((p) => p.id === Number(id));
    if (idx === -1) return res.status(404).json({ error: 'Product not found' });
    products.splice(idx, 1);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
