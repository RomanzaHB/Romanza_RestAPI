'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function InputPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: Number(price) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // after submit, navigate back to dashboard and refresh
      router.push('/dashboard');
      // ensure fresh data
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100 p-4 px-5 md:px-60 lg:px-120 2xl:px-200'>
      <div className='w-full rounded-2xl border bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-center text-lg font-semibold'>Input Produk</h2>
        <form onSubmit={handleSubmit} className='space-y-3'>
          <input
            type='text'
            placeholder='Nama Produk'
            className='w-full rounded border px-3 py-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='number'
            placeholder='Harga'
            className='w-full rounded border px-3 py-2'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <div className='flex gap-2'>
            <button
              type='submit'
              className='flex-1 rounded bg-blue-600 py-2 text-white'
              disabled={submitting}
            >
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button
              type='button'
              onClick={() => router.push('/dashboard')}
              className='flex-1 rounded bg-gray-300 py-2'
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
