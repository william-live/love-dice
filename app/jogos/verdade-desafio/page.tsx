'use client';

import { useState, useEffect } from 'react';
import BackHeader from '@/components/BackHeader';
import { getPlayers } from '@/lib/store';
import {
  VERDADES_LEVE, VERDADES_PICANTE, VERDADES_HOT,
  DESAFIOS_LEVE, DESAFIOS_PICANTE, DESAFIOS_HOT,
} from '@/lib/games-data';

type Intensidade = 'leve' | 'picante' | 'hot';
type Escolha = 'verdade' | 'desafio' | null;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const INTENSIDADES: { key: Intensidade; label: string; emoji: string }[] = [
  { key: 'leve', label: 'Leve', emoji: '💚' },
  { key: 'picante', label: 'Picante', emoji: '🌶️' },
  { key: 'hot', label: 'Hot', emoji: '🔥' },
];

export default function VerdadeDesafioPage() {
  const [phase, setPhase] = useState<'setup' | 'game'>('setup');
  const [players, setPlayers] = useState<string[]>([]);
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    const saved = getPlayers()
    if (saved.length > 0) setPlayers(saved.map((p) => p.nome))
  }, []);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [intensidade, setIntensidade] = useState<Intensidade>('leve');
  const [escolha, setEscolha] = useState<Escolha>(null);
  const [cardText, setCardText] = useState('');
  const [usedVerdades, setUsedVerdades] = useState<Set<number>>(new Set());
  const [usedDesafios, setUsedDesafios] = useState<Set<number>>(new Set());

  const addPlayer = () => {
    const name = inputName.trim();
    if (!name || players.length >= 8) return;
    setPlayers([...players, name]);
    setInputName('');
  };

  const startGame = () => {
    if (players.length < 2) return;
    setPhase('game');
    setCurrentPlayerIndex(0);
    setEscolha(null);
  };

  const getCard = (tipo: 'verdade' | 'desafio') => {
    const dataMap: Record<Intensidade, { v: string[]; d: string[] }> = {
      leve: { v: VERDADES_LEVE, d: DESAFIOS_LEVE },
      picante: { v: VERDADES_PICANTE, d: DESAFIOS_PICANTE },
      hot: { v: VERDADES_HOT, d: DESAFIOS_HOT },
    };
    const data = dataMap[intensidade];
    const list = tipo === 'verdade' ? data.v : data.d;
    const used = tipo === 'verdade' ? usedVerdades : usedDesafios;

    let idx = Math.floor(Math.random() * list.length);
    let attempts = 0;
    while (used.has(idx) && attempts < list.length) {
      idx = (idx + 1) % list.length;
      attempts++;
    }
    if (attempts >= list.length) {
      if (tipo === 'verdade') setUsedVerdades(new Set());
      else setUsedDesafios(new Set());
    }
    if (tipo === 'verdade') setUsedVerdades((s) => new Set(s).add(idx));
    else setUsedDesafios((s) => new Set(s).add(idx));

    setEscolha(tipo);
    setCardText(list[idx]);
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((i) => (i + 1) % players.length);
    setEscolha(null);
    setCardText('');
  };

  if (phase === 'setup') {
    return (
      <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
        <BackHeader title="Verdade ou Desafio" emoji="💭" />
        <div className="flex-1 px-4 pt-20 pb-6 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-1">Quem vai jogar?</h2>
          <p className="text-white/50 text-sm mb-6">Adicione de 2 a 8 jogadores</p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
              placeholder="Nome do jogador..."
              maxLength={20}
              className="flex-1 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none"
              style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
            />
            <button
              onClick={addPlayer}
              disabled={players.length >= 8 || !inputName.trim()}
              className="px-4 rounded-xl font-bold text-white active:scale-95 transition-transform disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
            >
              +
            </button>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            {players.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
              >
                <span className="text-white font-medium">{p}</span>
                <button onClick={() => setPlayers(players.filter((_, idx) => idx !== i))} className="text-white/30 hover:text-white/70 text-lg">×</button>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <button
              onClick={startGame}
              disabled={players.length < 2}
              className="w-full font-bold text-lg text-white rounded-2xl active:scale-95 disabled:opacity-40"
              style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
            >
              Começar Jogo 💭
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <BackHeader title="Verdade ou Desafio" emoji="💭" />

      <div className="flex-1 flex flex-col px-4 pt-20 pb-6">
        {/* Current player */}
        <div
          className="w-full rounded-2xl p-4 mb-4 text-center"
          style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
        >
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Vez de</p>
          <p className="text-xl font-bold gradient-text">{players[currentPlayerIndex]}</p>
        </div>

        {/* Intensity */}
        <div
          className="flex w-full rounded-xl p-1 mb-4"
          style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
        >
          {INTENSIDADES.map((int) => (
            <button
              key={int.key}
              onClick={() => setIntensidade(int.key)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: intensidade === int.key ? 'linear-gradient(135deg, #f0197d, #8b5cf6)' : 'transparent',
                color: intensidade === int.key ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            >
              {int.emoji} {int.label}
            </button>
          ))}
        </div>

        {/* Choice buttons */}
        {!escolha && (
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => getCard('verdade')}
              className="flex-1 font-bold text-white rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #10b981, #8b5cf6)' }}
            >
              <div className="text-2xl mb-1">💭</div>
              <div>Verdade</div>
            </button>
            <button
              onClick={() => getCard('desafio')}
              className="flex-1 font-bold text-white rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #f0197d, #ff6b6b)' }}
            >
              <div className="text-2xl mb-1">🔥</div>
              <div>Desafio</div>
            </button>
          </div>
        )}

        {/* Card */}
        {escolha && (
          <div
            className="w-full rounded-2xl p-5 mb-4 fade-in-up"
            style={{
              background: '#1e0d2b',
              border: `1px solid ${escolha === 'verdade' ? '#10b981' : '#f0197d'}`,
              boxShadow: `0 0 20px ${escolha === 'verdade' ? '#10b98130' : '#f0197d30'}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{escolha === 'verdade' ? '💭' : '🔥'}</span>
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: escolha === 'verdade' ? '#10b981' : '#f0197d' }}
              >
                {escolha === 'verdade' ? 'Verdade' : 'Desafio'}
              </span>
            </div>
            <p className="text-white text-base leading-relaxed">{cardText}</p>
          </div>
        )}

        {/* Next player */}
        {escolha && (
          <div className="mt-auto">
            <button
              onClick={nextPlayer}
              className="w-full font-bold text-lg text-white rounded-2xl active:scale-95 transition-transform"
              style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
            >
              Próximo Jogador →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
