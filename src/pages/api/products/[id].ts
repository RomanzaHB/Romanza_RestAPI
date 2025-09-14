import type { NextApiRequest, NextApiResponse } from 'next';

import { products } from './data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // disable caching to avoid 304 responses during dev
  res.setHeader('Cache-Control', 'no-store');

  const {
    query: { id },
    method,
    body,
  } = req;
  const productId = Number(id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (method === 'PUT') {
    if (productIndex === -1)
      return res.status(404).json({ error: 'Product not found' });
    const { name, price } = body;
    products[productIndex] = { id: productId, name, price: Number(price) };
    return res.status(200).json(products[productIndex]);
  }

  if (method === 'DELETE') {
    if (productIndex === -1)
      return res.status(404).json({ error: 'Product not found' });
    products.splice(productIndex, 1);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
