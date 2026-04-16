import { Fingerprint, Share2, Wine } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-12">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between px-12 md:flex-row">
        <div className="mb-8 md:mb-0">
          <div className="mb-2 text-sm font-bold tracking-[0.2em] text-on-surface">Cherry Wine</div>
          <div className="font-body text-[10px] uppercase tracking-tighter text-on-surface/40">
            © 2024 Cherry Wine. 保留所有权利。
          </div>
        </div>

        <div className="flex gap-10">
          <a
            href="#"
            className="font-body text-[10px] uppercase tracking-tighter text-on-surface/40 transition-colors hover:text-primary"
          >
            隐私
          </a>
          <a
            href="#"
            className="font-body text-[10px] uppercase tracking-tighter text-on-surface/40 transition-colors hover:text-primary"
          >
            条款
          </a>
          <a
            href="#"
            className="font-body text-[10px] uppercase tracking-tighter text-on-surface/40 transition-colors hover:text-primary"
          >
            联系方式
          </a>
        </div>

        <div className="mt-8 flex gap-6 text-primary-container md:mt-0">
          <Share2 className="h-5 w-5 cursor-pointer opacity-80 hover:opacity-100" />
          <Fingerprint className="h-5 w-5 cursor-pointer opacity-80 hover:opacity-100" />
          <Wine className="h-5 w-5 cursor-pointer opacity-80 hover:opacity-100" />
        </div>
      </div>
    </footer>
  );
}
