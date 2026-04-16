'use client';

import { useRouter } from 'next/navigation';

import { CTA, FAQ, Features, Hero, Testimonials } from '@/App';

export default function HomePage() {
  const router = useRouter();

  return (
    <main>
      <Hero onStartWorkshop={() => router.push('/workshop')} />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
