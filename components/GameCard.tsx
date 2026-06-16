'use client';

import Link from 'next/link';

interface GameCardProps {
  emoji: string;
  nome: string;
  descricao: string;
  gradient: string;
  badge: 'A Dois' | 'Grupo' | 'Qualquer';
  href: string;
}

const badgeColors: Record<string, string> = {
  'A Dois': 'rgba(240,25,125,0.25)',
  'Grupo': 'rgba(139,92,246,0.25)',
  'Qualquer': 'rgba(255,107,107,0.25)',
};

const badgeTextColors: Record<string, string> = {
  'A Dois': '#f0197d',
  'Grupo': '#8b5cf6',
  'Qualquer': '#ff6b6b',
};

export default function GameCard({ emoji, nome, descricao, gradient, badge, href }: GameCardProps) {
  return (
    <Link href={href} className="block">
      <div
        className="rounded-2xl overflow-hidden active:scale-95 transition-transform duration-150 cursor-pointer"
        style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
      >
        {/* Top strip with gradient and emoji */}
        <div
          className="flex items-center justify-center py-6"
          style={{ background: gradient }}
        >
          <span className="text-4xl drop-shadow-lg">{emoji}</span>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-sm text-white mb-1 leading-tight">{nome}</h3>
          <p className="text-xs text-white/60 leading-snug mb-3 line-clamp-2">{descricao}</p>
          <span
            className="inline-block text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              background: badgeColors[badge],
              color: badgeTextColors[badge],
            }}
          >
            {badge}
          </span>
        </div>
      </div>
    </Link>
  );
}
