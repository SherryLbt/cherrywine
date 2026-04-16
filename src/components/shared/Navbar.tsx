'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

const navItems = [
  { href: '/', label: '体验' },
  { href: '/about', label: '关于' },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="cursor-pointer text-2xl font-headline italic tracking-widest text-primary"
        >
          Cherry Wine
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'border-b border-transparent pb-1 font-headline font-light uppercase tracking-widest transition-colors',
                  isActive
                    ? 'border-primary/30 text-primary'
                    : 'text-on-surface/60 hover:text-on-surface',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/workshop"
            className="rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-2 text-sm font-bold text-on-primary transition-all hover:opacity-90 active:scale-95"
          >
            开始调酒
          </Link>
        </div>
      </div>
    </nav>
  );
}
