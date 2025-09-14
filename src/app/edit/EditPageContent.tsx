'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function EditPageContent() {
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
    setName(initialName);
    setPrice(initialPrice);
  }, [initialName, initialPrice]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return setError('No product id');
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${editId}`, {
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
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!editId) return setError('No product id');
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${editId}`, {
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
    <main className='flex min-h-screen items-center justify-center bg-gray-100 p-4 px-5 md:px-60 lg:px-120 2xl:px-200'>
      <div className='w-full rounded-2xl border bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-center text-lg font-semibold'>Edit Produk</h2>
        <form onSubmit={handleSave} className='space-y-3'>
          <input
            type='text'
            placeholder='Nama Produk'
            className='w-full rounded border px-3 py-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving || deleting}
          />
          <input
            type='number'
            placeholder='Harga Produk'
            className='w-full rounded border px-3 py-2'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={saving || deleting}
          />
          <div className='flex gap-2'>
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300'
              disabled={saving || deleting}
            >
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button
              type='button'
              className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-red-300'
              onClick={() => setShowConfirm(true)}
              disabled={saving || deleting}
            >
              {deleting ? 'Menghapus...' : 'Hapus'}
            </button>
          </div>
        </form>
        {error && <div className='mt-2 text-red-500'>{error}</div>}
        {showConfirm && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
            <div className='rounded bg-white p-6'>
              <p className='mb-4'>Yakin, anda ingin menghapus</p>
              <div className='flex gap-2'>
                <button
                  className='rounded bg-red-500 px-3 py-1 text-white'
                  onClick={() => {
                    setShowConfirm(false);
                    handleDelete();
                  }}
                >
                  Ya
                </button>
                <button
                  className='rounded bg-gray-300 px-3 py-1'
                  onClick={() => setShowConfirm(false)}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
