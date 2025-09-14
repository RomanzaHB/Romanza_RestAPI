import Image from 'next/image';
import Link from 'next/link';

export default function EventPage() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Event</h1>
        <div className='mx-auto h-full w-full rounded-lg px-2'>
          <Image src='/images/17an.png' alt='17an' width={492} height={292} />
        </div>
        <div className='mt-4 flex justify-center gap-8'>
          <div className='inline-block rounded-lg bg-gray-500 px-3 py-1 text-white'>
            <Link href='/'>Back</Link>
          </div>
          <div className='inline-block rounded-lg bg-gray-500 px-3 py-1 text-white'>
            <a href='/images/17an.png' download className='text-white'>
              Download
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
