'use client';

import { useState, useEffect } from 'react';
import BackHeader from '@/components/BackHeader';
import { getMissoes } from '@/lib/games-data';
import { getPlayers, getCategorias } from '@/lib/store';

interface PlayerMission {
  name: string;
  mission: string;
  revealed: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MissaoSecretaPage() {
  const [phase, setPhase] = useState<'setup' | 'distribute' | 'play' | 'reveal'>('setup');
  const [players, setPlayers] = useState<string[]>([]);
  const [inputName, setInputName] = useState('');
  const [missions, setMissions] = useState<PlayerMission[]>([]);
  const [distributeIndex, setDistributeIndex] = useState(0);
  const [showingMission, setShowingMission] = useState(false);

  useEffect(() => {
    const saved = getPlayers();
    if (saved.length > 0) setPlayers(saved.map((p) => p.nome));
  }, []);

  const addPlayer = () => {
    const name = inputName.trim();
    if (!name || players.length >= 8) return;
    setPlayers([...players, name]);
    setInputName('');
  };

  const startDistribution = () => {
    if (players.length < 2) return;
    const cats = getCategorias();
    const pool = shuffle(getMissoes(cats));
    const shuffledMissions = pool.slice(0, players.length);
    setMissions(players.map((name, i) => ({ name, mission: shuffledMissions[i], revealed: false })));
    setDistributeIndex(0);
    setShowingMission(false);
    setPhase('distribute');
  };

  const hideMission = () => {
    setShowingMission(false);
    if (distributeIndex + 1 >= players.length) setPhase('play');
    else setDistributeIndex((i) => i + 1);
  };

  const restart = () => {
    setPlayers([]);
    setInputName('');
    setPhase('setup');
  };

  if (phase === 'setup') {
    return (
      <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
        <BackHeader title="Missão Secreta" emoji="🔐" />
        <div className="flex-1 px-4 pt-20 pb-6 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-1">Quem vai jogar?</h2>
          <p className="text-white/50 text-sm mb-6">Cada um recebe uma missão oculta</p>

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
              <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}>
                <span className="text-white font-medium">{p}</span>
                <button onClick={() => setPlayers(players.filter((_, idx) => idx !== i))} className="text-white/30 hover:text-white/70 text-lg">×</button>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <button
              onClick={startDistribution}
              disabled={players.length < 2}
              className="w-full font-bold text-lg text-white rounded-2xl active:scale-95 disabled:opacity-40"
              style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
            >
              Distribuir Missões 🔐
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'distribute') {
    const currentPlayer = missions[distributeIndex];
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-4" style={{ background: '#120818' }}>
        <div className="w-full text-center mb-8">
          <p className="text-white/50 text-sm mb-2">Missão para</p>
          <h2 className="text-2xl font-bold gradient-text">{currentPlayer.name}</h2>
          <p className="text-white/30 text-xs mt-1">{distributeIndex + 1} de {missions.length}</p>
        </div>

        {!showingMission ? (
          <div className="w-full">
            <div className="w-full rounded-2xl p-8 mb-6 text-center" style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}>
              <span className="text-5xl mb-4 block">🔒</span>
              <p className="text-white/60 text-sm">Sua missão está secreta.<br />Só você pode ver.</p>
            </div>
            <button
              onClick={() => setShowingMission(true)}
              className="w-full font-bold text-lg text-white rounded-2xl active:scale-95"
              style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
            >
              👁️ Ver Minha Missão
            </button>
          </div>
        ) : (
          <div className="w-full">
            <div
              className="w-full rounded-2xl p-6 mb-6 fade-in-up"
              style={{ background: '#1e0d2b', border: '1px solid rgba(240,25,125,0.4)', boxShadow: '0 0 30px rgba(240,25,125,0.2)' }}
            >
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Sua missão secreta</p>
              <p className="text-white text-base leading-relaxed font-medium">{currentPlayer.mission}</p>
              <p className="text-white/30 text-xs mt-4">Execute durante a noite sem contar para ninguém!</p>
            </div>
            <button
              onClick={hideMission}
              className="w-full font-bold text-lg text-white rounded-2xl active:scale-95"
              style={{ minHeight: 56, background: '#2d1445' }}
            >
              ✅ Entendido, Esconder
            </button>
          </div>
        )}
      </div>
    );
  }

  if (phase === 'play') {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-4" style={{ background: '#120818' }}>
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4">🕵️</span>
          <h2 className="text-2xl font-bold text-white mb-2">Missões Distribuídas!</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Cada um sabe sua missão secreta.<br />
            Curtam a noite e tentem completá-las!
          </p>
        </div>

        <div className="w-full rounded-2xl p-4 mb-8" style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}>
          {missions.map((m, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b last:border-b-0" style={{ borderColor: '#2d1445' }}>
              <span className="text-white font-medium">{m.name}</span>
              <span className="ml-auto text-white/30 text-sm">🔒 missão secreta</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPhase('reveal')}
          className="w-full font-bold text-lg text-white rounded-2xl active:scale-95"
          style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
        >
          🎉 Revelar Todas as Missões
        </button>
      </div>
    );
  }

  if (phase === 'reveal') {
    return (
      <div className="min-h-dvh flex flex-col px-4 pt-10 pb-6" style={{ background: '#120818' }}>
        <div className="text-center mb-6">
          <span className="text-5xl block mb-3">🎉</span>
          <h2 className="text-2xl font-bold text-white mb-1">Revelação Final!</h2>
          <p className="text-white/50 text-sm">Quem tinha qual missão?</p>
        </div>
        <div className="flex flex-col gap-3 mb-8">
          {missions.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 fade-in-up"
              style={{ background: '#1e0d2b', border: '1px solid #2d1445', animationDelay: `${i * 0.1}s` }}
            >
              <p className="font-bold gradient-text mb-2">{m.name}</p>
              <p className="text-white/80 text-sm leading-relaxed">{m.mission}</p>
            </div>
          ))}
        </div>
        <button
          onClick={restart}
          className="w-full font-bold text-lg text-white rounded-2xl active:scale-95"
          style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
        >
          Jogar Novamente 🔄
        </button>
      </div>
    );
  }

  return null;
}
