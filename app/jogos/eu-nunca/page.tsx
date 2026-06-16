'use client';

import { useState, useEffect } from 'react';
import BackHeader from '@/components/BackHeader';
import { getEuNunca } from '@/lib/games-data';
import { getPlayers, getCategorias } from '@/lib/store';

interface Player {
  name: string;
  drinks: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function EuNuncaPage() {
  const [phase, setPhase] = useState<'setup' | 'game' | 'end'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [inputName, setInputName] = useState('');
  const [cards, setCards] = useState<string[]>([]);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const saved = getPlayers();
    if (saved.length > 0) setPlayers(saved.map((p) => ({ name: p.nome, drinks: 0 })));
  }, []);

  const addPlayer = () => {
    const name = inputName.trim();
    if (!name || players.length >= 6) return;
    setPlayers([...players, { name, drinks: 0 }]);
    setInputName('');
  };

  const startGame = () => {
    if (players.length < 2) return;
    const cats = getCategorias();
    const content = getEuNunca(cats);
    if (content.length === 0) {
      setCards(shuffle(['Nenhum conteúdo ativo. Volte e selecione categorias.']));
    } else {
      setCards(shuffle(content));
    }
    setCardIndex(0);
    setPhase('game');
  };

  const addDrink = (i: number) => {
    setPlayers((prev) => prev.map((p, idx) => idx === i ? { ...p, drinks: p.drinks + 1 } : p));
  };

  const nextCard = () => {
    if (cardIndex + 1 >= cards.length) setPhase('end');
    else setCardIndex((c) => c + 1);
  };

  const restart = () => {
    setPlayers([]);
    setInputName('');
    setPhase('setup');
  };

  if (phase === 'setup') {
    return (
      <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
        <BackHeader title="Eu Nunca" emoji="🍹" />
        <div className="flex-1 px-4 pt-20 pb-6 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-1">Quem vai jogar?</h2>
          <p className="text-white/50 text-sm mb-6">Mínimo 2 jogadores · Beba se já fez</p>

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
              disabled={players.length >= 6 || !inputName.trim()}
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
                <span className="text-white font-medium">{p.name}</span>
                <button
                  onClick={() => setPlayers(players.filter((_, idx) => idx !== i))}
                  className="text-white/30 hover:text-white/70 text-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <button
              onClick={startGame}
              disabled={players.length < 2}
              className="w-full font-bold text-lg text-white rounded-2xl transition-all active:scale-95 disabled:opacity-40"
              style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
            >
              Começar Jogo 🍹
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'end') {
    const sorted = [...players].sort((a, b) => b.drinks - a.drinks);
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-4" style={{ background: '#120818' }}>
        <div className="text-center mb-8">
          <span className="text-6xl">🏆</span>
          <h2 className="text-2xl font-bold text-white mt-4 mb-2">Fim de Jogo!</h2>
          <p className="text-white/50">Quem bebeu mais confessou mais 😏</p>
        </div>
        <div className="w-full flex flex-col gap-3 mb-8">
          {sorted.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
            >
              <span className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
              <span className="flex-1 text-white font-semibold">{p.name}</span>
              <span className="text-white/60">{p.drinks} 🍹</span>
            </div>
          ))}
        </div>
        <button
          onClick={restart}
          className="w-full font-bold text-lg text-white rounded-2xl"
          style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
        >
          Jogar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <BackHeader title="Eu Nunca" emoji="🍹" />
      <div className="flex-1 flex flex-col px-4 pt-20 pb-6">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/40 text-sm">{cardIndex + 1} / {cards.length}</span>
          <div className="flex-1 mx-3 h-1 rounded-full" style={{ background: '#2d1445' }}>
            <div
              className="h-1 rounded-full transition-all"
              style={{ width: `${((cardIndex + 1) / cards.length) * 100}%`, background: 'linear-gradient(90deg, #f0197d, #8b5cf6)' }}
            />
          </div>
        </div>

        {/* Card */}
        <div
          className="w-full rounded-2xl p-6 mb-6 flex flex-col items-center justify-center text-center"
          style={{ background: '#1e0d2b', border: '1px solid #2d1445', minHeight: 180 }}
        >
          <p className="text-white/40 text-sm mb-3 uppercase tracking-wider">Eu nunca...</p>
          <p className="text-white text-lg font-semibold leading-relaxed">{cards[cardIndex]}</p>
          <p className="text-white/30 text-xs mt-4">🍹 Beba se já fez isso</p>
        </div>

        {/* Players */}
        <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Toque quem já fez para beber 🍹</p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {players.map((p, i) => (
            <button
              key={i}
              onClick={() => addDrink(i)}
              className="flex items-center justify-between px-4 py-3 rounded-xl active:scale-95 transition-transform"
              style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
            >
              <span className="text-white font-medium text-sm truncate">{p.name}</span>
              <span className="text-white/60 text-sm ml-2">🍹 {p.drinks}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <button
            onClick={nextCard}
            className="w-full font-bold text-lg text-white rounded-2xl active:scale-95 transition-transform"
            style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
          >
            {cardIndex + 1 >= cards.length ? 'Ver Placar Final 🏆' : 'Próxima →'}
          </button>
        </div>
      </div>
    </div>
  );
}
