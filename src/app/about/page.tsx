'use client';

import { useRouter } from 'next/navigation';

import { About } from '@/App';

export default function AboutPage() {
  const router = useRouter();

  return (
    <main>
      <About onStartWorkshop={() => router.push('/workshop')} />
    </main>
  );
}
