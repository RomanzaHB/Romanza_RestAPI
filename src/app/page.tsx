'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-6 text-4xl font-bold md:text-5xl lg:text-6xl'>
          Selamat Datang
        </h1>
        <p className='mb-6 text-xl md:text-2xl lg:text-3xl'>
          Silakan pergi ke dashboard untuk mengelola produk.
        </p>
        <div className='flex w-full flex-col items-center gap-3'>
          <Link
            href='/dashboard'
            className='rounded bg-blue-600 px-4 py-2 text-xl text-white'
          >
            Open Dashboard
          </Link>
          <Link
            href='/event'
            className='mt-2 rounded bg-orange-500 px-4 py-2 text-xl text-white'
          >
            Event 17an
          </Link>
          {/* External links: display side-by-side, left and right aligned */}
          <div className='mt-20 flex w-full items-center justify-between gap-4 px-4 text-sm md:gap-8 md:px-20 md:text-lg lg:gap-12 lg:px-30 lg:text-lg'>
            <Link
              href='https://romanza-dashboard.vercel.app/'
              className='w-1/2 rounded bg-green-500 px-4 py-2 text-center text-white'
            >
              Sample Dashboard
            </Link>
            <Link
              href='https://romanza-portfolio-3d.vercel.app/'
              className='w-1/2 rounded bg-cyan-500 px-4 py-2 text-center text-white'
            >
              Portfolio Romanza
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
