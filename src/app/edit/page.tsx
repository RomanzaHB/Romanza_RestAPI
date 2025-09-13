'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function EditPage() {
  const router = useRouter();
  const params = useSearchParams();
  const editId = params?.get('editId') ?? '';
  const initialName = params?.get('name') ?? '';
  const initialPrice = params?.get('price') ?? '';

  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If params change, update local state
    setName(initialName);
    setPrice(initialPrice);
  }, [initialName, initialPrice]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return setError('No product id');
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/products/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: Number(price) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || String(err));
    } finally {
      setSaving(false);
    }
  };

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!editId) return setError('No product id');
    const ok = confirm('Yakin ingin menghapus produk ini?');
    if (!ok) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8080/products/${editId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || String(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100 p-4 md:px-60 lg:px-120 2xl:px-200'>
      <div className='relative w-full rounded-2xl border bg-white p-6 shadow-lg'>
        <button
          type='button'
          onClick={() => router.push('/dashboard')}
          className='absolute top-4 right-4 rounded-lg bg-gray-500 px-2 py-1 text-xs text-white'
        >
          Kembali
        </button>
        <h2 className='mb-4 text-center text-lg font-semibold'>Edit Produk</h2>
        {error && <div className='mb-3 text-red-600'>{error}</div>}
        <form onSubmit={handleSave} className='space-y-3'>
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
              disabled={saving}
            >
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button
              type='button'
              onClick={handleDelete}
              className='flex-1 rounded bg-red-500 py-2 text-white'
              disabled={deleting}
            >
              {deleting ? 'Menghapus...' : 'Hapus'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
