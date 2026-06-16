'use client';

import { useRouter } from 'next/navigation';

interface BackHeaderProps {
  title: string;
  emoji: string;
}

export default function BackHeader({ title, emoji }: BackHeaderProps) {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-[430px]">
      <div
        className="flex items-center px-4 py-3"
        style={{ background: 'rgba(18,8,24,0.95)', borderBottom: '1px solid #2d1445', backdropFilter: 'blur(10px)' }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full text-white active:scale-95 transition-transform"
          style={{ background: '#2d1445' }}
          aria-label="Voltar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="flex-1 text-center">
          <span className="text-lg font-bold">
            {emoji} {title}
          </span>
        </div>
        <div className="w-10" />
      </div>
    </div>
  );
}
