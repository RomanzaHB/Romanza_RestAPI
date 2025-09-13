'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Welcome</h1>
        <p className='mb-4'>Go to the dashboard to manage products.</p>
        <Link
          href='/dashboard'
          className='rounded bg-blue-600 px-4 py-2 text-white'
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}
