'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      setError(null);
      const res = await fetch('http://localhost:8080/products');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProducts(data);
      console.log('fetched products', data);
    } catch (err: any) {
      console.error('fetchProducts error', err);
      setError(err?.message || String(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Input handled on /input page. Dashboard only lists products.

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100 p-4 px-5 md:px-60 lg:px-120 2xl:px-200'>
      <div className='w-full rounded-2xl border bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-center text-lg font-semibold'>
          <Link href='/' className='text-inherit'>
            Dashboard
          </Link>
        </h2>

        {/* Yellow header box */}
        <div className='mb-4 rounded-2xl border-1 border-gray-400 bg-yellow-300 p-2 text-center'>
          <div className='mb-2 rounded-lg border-1 border-gray-400 bg-white px-3 py-2 text-sm font-semibold'>
            Daftar Belanja
          </div>
          <div className='rounded-lg border-1 border-gray-400 bg-white px-3 py-2 text-sm font-semibold'>
            Harga Product
          </div>
        </div>

        {/* Products grid (2 columns) */}
        <div className='mb-4 grid grid-cols-2 gap-3'>
          {loading ? (
            <div className='col-span-2 text-center'>Loading...</div>
          ) : error ? (
            <div className='col-span-2 text-center text-red-600'>
              Error: {error}
            </div>
          ) : products.length === 0 ? (
            <div className='col-span-2 text-center text-gray-500'>
              Belum ada produk.
            </div>
          ) : (
            products.map((p) => (
              <div key={p.id} className='group relative'>
                <button
                  className='flex w-full flex-col items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-center text-white shadow'
                  type='button'
                  onClick={() => console.log('clicked', p)}
                >
                  <span className='text-sm font-medium'>{p.name}</span>
                  <span className='mt-1 text-xs'>
                    Rp{p.price.toLocaleString()}
                  </span>
                </button>

                {/* Edit badge: hidden until hover */}
                <button
                  type='button'
                  title='Edit'
                  onClick={() => {
                    const params = new URLSearchParams({
                      editId: String(p.id),
                      name: String(p.name),
                      price: String(p.price),
                    });
                    router.push(`/edit?${params.toString()}`);
                  }}
                  className='pointer-events-auto absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-300 text-blue-600 opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100'
                >
                  ✎
                </button>
              </div>
            ))
          )}
        </div>

        {/* Link to input page */}
        <div>
          <Link
            href='/input'
            className='mb-3 inline-block w-full rounded bg-gray-400 py-2 text-center text-sm font-medium text-white'
          >
            Tambah Produk
          </Link>
        </div>
      </div>
    </main>
  );
}
