'use client';

import { useState } from 'react';
import BackHeader from '@/components/BackHeader';
import { INTIMIDADE_CONHECER, INTIMIDADE_DESEJOS, INTIMIDADE_FANTASIA } from '@/lib/games-data';

type Deck = 'conhecer' | 'desejos' | 'fantasia';

const DECKS: { key: Deck; label: string; emoji: string; cor: string; data: string[] }[] = [
  { key: 'conhecer', label: 'Conhecer Melhor', emoji: '💛', cor: '#fbbf24', data: INTIMIDADE_CONHECER },
  { key: 'desejos', label: 'Desejos', emoji: '💜', cor: '#8b5cf6', data: INTIMIDADE_DESEJOS },
  { key: 'fantasia', label: 'Fantasia', emoji: '🔮', cor: '#f0197d', data: INTIMIDADE_FANTASIA },
];

export default function IntimidadePage() {
  const [deck, setDeck] = useState<Deck>('conhecer');
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const currentDeck = DECKS.find((d) => d.key === deck)!;
  const total = currentDeck.data.length;

  const changeDeck = (d: Deck) => {
    setDeck(d);
    setIndex(0);
  };

  const next = () => {
    if (animating || index >= total - 1) return;
    setAnimating(true);
    setDirection('next');
    setTimeout(() => {
      setIndex((i) => i + 1);
      setAnimating(false);
    }, 200);
  };

  const prev = () => {
    if (animating || index <= 0) return;
    setAnimating(true);
    setDirection('prev');
    setTimeout(() => {
      setIndex((i) => i - 1);
      setAnimating(false);
    }, 200);
  };

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <BackHeader title="Intimidade" emoji="❤️" />

      <div className="flex-1 flex flex-col px-4 pt-20 pb-6">
        {/* Deck Tabs */}
        <div
          className="flex w-full rounded-xl p-1 mb-6"
          style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
        >
          {DECKS.map((d) => (
            <button
              key={d.key}
              onClick={() => changeDeck(d.key)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: deck === d.key ? d.cor : 'transparent',
                color: deck === d.key ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            >
              {d.emoji}
            </button>
          ))}
        </div>

        <p
          className="text-center text-sm font-semibold mb-4"
          style={{ color: currentDeck.cor }}
        >
          {currentDeck.emoji} {currentDeck.label}
        </p>

        {/* Question Card */}
        <div
          className="w-full rounded-2xl p-6 mb-4 flex flex-col items-center justify-center text-center"
          style={{
            background: '#1e0d2b',
            border: `1px solid ${currentDeck.cor}40`,
            boxShadow: `0 0 30px ${currentDeck.cor}20`,
            minHeight: 220,
            opacity: animating ? 0 : 1,
            transform: animating ? (direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)') : 'translateX(0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          <span className="text-3xl mb-4">{currentDeck.emoji}</span>
          <p className="text-white text-base leading-relaxed font-medium">
            {currentDeck.data[index]}
          </p>
        </div>

        {/* Counter */}
        <p className="text-white/40 text-sm text-center mb-4">
          {index + 1} de {total}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 mb-6 flex-wrap">
          {Array.from({ length: Math.min(total, 25) }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === index ? 16 : 6,
                height: 6,
                background: i === index ? currentDeck.cor : i < index ? `${currentDeck.cor}60` : '#2d1445',
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex-1 font-semibold text-white rounded-xl py-4 active:scale-95 transition-transform disabled:opacity-30"
            style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
          >
            ← Anterior
          </button>
          <button
            onClick={next}
            disabled={index >= total - 1}
            className="flex-1 font-semibold text-white rounded-xl py-4 active:scale-95 transition-transform disabled:opacity-30"
            style={{ background: `linear-gradient(135deg, ${currentDeck.cor}, #8b5cf6)` }}
          >
            Próxima →
          </button>
        </div>
      </div>
    </div>
  );
}
