'use client';

import { useState, useEffect } from 'react';
import BackHeader from '@/components/BackHeader';
import { KAMA_SUAVE, KAMA_QUENTE, KAMA_INTENSO, type KamaPosicao } from '@/lib/games-data';
import { getCategorias, getPlayers, getPairType, type PairType } from '@/lib/store';

type Nivel = 'suave' | 'quente' | 'intenso';

const PAIRTYPE_NOTE: Partial<Record<PairType, string>> = {
  MM: '♂♂ Para vocês: adaptem com brinquedo quando necessário.',
  FF: '♀♀ Para vocês: usem brinquedo ou tribadismo nas posições de penetração.',
};

export default function KamaSutraPage() {
  const [nivel, setNivel] = useState<Nivel>('suave');
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIntenso, setShowIntenso] = useState(false);
  const [pairNote, setPairNote] = useState('');

  useEffect(() => {
    const cats = getCategorias();
    setShowIntenso(cats.includes('penetracao'));
    const players = getPlayers();
    const pt = getPairType(players);
    setPairNote(PAIRTYPE_NOTE[pt] || '');
  }, []);

  const nivelData: Record<Nivel, KamaPosicao[]> = {
    suave: KAMA_SUAVE,
    quente: KAMA_QUENTE,
    intenso: KAMA_INTENSO,
  };

  const NIVEIS = [
    { key: 'suave' as Nivel, label: 'Suave', emoji: '🌸' },
    { key: 'quente' as Nivel, label: 'Quente', emoji: '🔥' },
    ...(showIntenso ? [{ key: 'intenso' as Nivel, label: 'Intenso', emoji: '💥' }] : []),
  ];

  const currentData = nivelData[nivel];
  const posicao = currentData[index];

  const changeNivel = (n: Nivel) => {
    if (n === 'intenso' && !showIntenso) return;
    setNivel(n);
    setIndex(0);
    setIsFlipped(false);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(false);
    setTimeout(() => {
      setIndex((i) => (i - 1 + currentData.length) % currentData.length);
      setIsAnimating(false);
      setTimeout(() => setIsFlipped(true), 300);
    }, 200);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % currentData.length);
      setIsAnimating(false);
      setTimeout(() => setIsFlipped(true), 300);
    }, 200);
  };

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <BackHeader title="Kama Sutra" emoji="🃏" />

      <div className="flex-1 flex flex-col items-center px-4 pt-20 pb-6">
        {pairNote && (
          <div
            className="w-full rounded-xl px-4 py-2.5 mb-4 text-center text-xs"
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}
          >
            {pairNote}
          </div>
        )}

        {/* Level Tabs */}
        <div className="flex w-full rounded-xl p-1 mb-6" style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}>
          {NIVEIS.map((n) => (
            <button
              key={n.key}
              onClick={() => changeNivel(n.key)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: nivel === n.key ? 'linear-gradient(135deg, #f0197d, #8b5cf6)' : 'transparent',
                color: nivel === n.key ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            >
              {n.emoji} {n.label}
            </button>
          ))}
          {!showIntenso && (
            <div
              className="flex-1 py-2 rounded-lg text-sm text-center"
              style={{ color: 'rgba(255,255,255,0.2)' }}
              title="Ative 'Penetração' na home"
            >
              💥 🔒
            </div>
          )}
        </div>

        <p className="text-white/40 text-sm mb-4">Carta {index + 1} de {currentData.length}</p>

        {/* Flip Card */}
        <div
          className="w-full cursor-pointer"
          style={{ perspective: '1000px', height: 280 }}
          onClick={() => !isAnimating && setIsFlipped((f) => !f)}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s ease',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            <div
              style={{
                position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 20,
                background: 'linear-gradient(135deg, #8b5cf6, #f0197d)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
              }}
            >
              <span className="text-6xl">🔒</span>
              <p className="text-white font-bold text-lg">TOQUE PARA REVELAR</p>
              <p className="text-white/60 text-sm">{NIVEIS.find((n) => n.key === nivel)?.emoji} {NIVEIS.find((n) => n.key === nivel)?.label}</p>
            </div>
            <div
              style={{
                position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                borderRadius: 20, background: '#1e0d2b', border: '1px solid #2d1445',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: 24, gap: 8,
              }}
            >
              <span className="text-5xl">{posicao.emoji}</span>
              <h2 className="text-xl font-bold gradient-text">{posicao.nome}</h2>
              <p className="text-white/70 text-sm text-center leading-relaxed">{posicao.descricao}</p>
              <p className="text-white/30 text-xs mt-2">Toque para ocultar</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 w-full">
          <button
            onClick={prev}
            className="flex-1 font-semibold text-white rounded-xl py-4 active:scale-95 transition-transform"
            style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
          >
            ← Anterior
          </button>
          <button
            onClick={next}
            className="flex-1 font-semibold text-white rounded-xl py-4 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
          >
            Próxima →
          </button>
        </div>
      </div>
    </div>
  );
}
