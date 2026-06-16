'use client';

import { useState, useEffect } from 'react';
import BackHeader from '@/components/BackHeader';
import { getPersonagens, CENARIOS, type Personagem, type Cenario } from '@/lib/games-data';
import { getPlayers, getPairType } from '@/lib/store';

type Intensidade = 'suave' | 'quente';

function FlipCard({ label, emoji, nome, isFlipped, onClick, gradient }: {
  label: string; emoji: string; nome: string; isFlipped: boolean; onClick: () => void; gradient: string;
}) {
  return (
    <div className="cursor-pointer" style={{ perspective: '600px', flex: 1, height: 160 }} onClick={onClick}>
      <div style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', transition: 'transform 0.6s ease', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 16, background: gradient, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <span style={{ fontSize: 28 }}>❓</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600, textAlign: 'center', padding: '0 8px' }}>{label}</span>
        </div>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 16, background: '#1e0d2b', border: '1px solid #2d1445', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 8 }}>
          <span style={{ fontSize: 28 }}>{emoji}</span>
          <span style={{ color: 'white', fontSize: 11, fontWeight: 700, textAlign: 'center' }}>{nome}</span>
        </div>
      </div>
    </div>
  );
}

const NARRATIVAS_SUAVE = [
  'é uma noite de descobertas suaves. Os dois se encontram no cenário perfeito, onde a cumplicidade transforma cada toque numa memória inesquecível.',
  'o ambiente convida para uma exploração delicada. A atmosfera carregada de tensão doce faz com que cada olhar diga mais que mil palavras.',
  'tudo começa com um encontro casual que rapidamente se transforma em algo muito mais íntimo e especial.',
];

const NARRATIVAS_QUENTE = [
  'a tensão entre os dois é inconfundível. O encontro inevitável no cenário perfeito acende um fogo que nenhum dos dois sabe controlar.',
  'há algo no ar que transforma um encontro simples em algo impossível de ignorar. A atração mútua ganha vida própria.',
  'as regras foram criadas para ser quebradas, e nessa noite especial, os dois decidem finalmente explorar o que há muito tempo estava reprimido.',
];

export default function FantasiaPage() {
  const [intensidade, setIntensidade] = useState<Intensidade>('suave');
  const [flipped, setFlipped] = useState([false, false, false]);
  const [personagemA, setPersonagemA] = useState<Personagem | null>(null);
  const [personagemB, setPersonagemB] = useState<Personagem | null>(null);
  const [cenario, setCenario] = useState<Cenario>(CENARIOS[0]);
  const [personagensA, setPersonagensA] = useState<Personagem[]>([]);
  const [personagensB, setPersonagensB] = useState<Personagem[]>([]);

  useEffect(() => {
    const players = getPlayers();
    const pt = getPairType(players);
    const { A, B } = getPersonagens(pt);
    setPersonagensA(A);
    setPersonagensB(B);
    setPersonagemA(A[Math.floor(Math.random() * A.length)]);
    setPersonagemB(B[Math.floor(Math.random() * B.length)]);
  }, []);

  const allFlipped = flipped.every(Boolean);

  const handleFlip = (i: number) => setFlipped((prev) => prev.map((v, idx) => (idx === i ? true : v)));

  const shuffle = () => {
    if (personagensA.length === 0) return;
    setFlipped([false, false, false]);
    setPersonagemA(personagensA[Math.floor(Math.random() * personagensA.length)]);
    setPersonagemB(personagensB[Math.floor(Math.random() * personagensB.length)]);
    setCenario(CENARIOS[Math.floor(Math.random() * CENARIOS.length)]);
  };

  const narrativas = intensidade === 'suave' ? NARRATIVAS_SUAVE : NARRATIVAS_QUENTE;
  const narrativa = narrativas[0];

  if (!personagemA || !personagemB) return null;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <BackHeader title="Gerador de Fantasia" emoji="🎭" />

      <div className="flex-1 flex flex-col px-4 pt-20 pb-6">
        <div className="flex w-full rounded-xl p-1 mb-6" style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}>
          {(['suave', 'quente'] as Intensidade[]).map((i) => (
            <button
              key={i}
              onClick={() => setIntensidade(i)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
              style={{
                background: intensidade === i ? 'linear-gradient(135deg, #f0197d, #8b5cf6)' : 'transparent',
                color: intensidade === i ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            >
              {i === 'suave' ? '🌸 Suave' : '🔥 Quente'}
            </button>
          ))}
        </div>

        <p className="text-white/50 text-sm mb-4 text-center">Toque cada carta para revelar</p>

        <div className="flex gap-3 mb-6" style={{ height: 160 }}>
          <FlipCard
            label="Personagem A"
            emoji={personagemA.emoji}
            nome={personagemA.nome}
            isFlipped={flipped[0]}
            onClick={() => handleFlip(0)}
            gradient="linear-gradient(135deg, #f0197d, #8b5cf6)"
          />
          <FlipCard
            label="Personagem B"
            emoji={personagemB.emoji}
            nome={personagemB.nome}
            isFlipped={flipped[1]}
            onClick={() => handleFlip(1)}
            gradient="linear-gradient(135deg, #8b5cf6, #06b6d4)"
          />
          <FlipCard
            label="Cenário"
            emoji={cenario.emoji}
            nome={cenario.nome}
            isFlipped={flipped[2]}
            onClick={() => handleFlip(2)}
            gradient="linear-gradient(135deg, #ff6b6b, #f0197d)"
          />
        </div>

        {allFlipped && (
          <div
            className="w-full rounded-2xl p-5 mb-6 fade-in-up"
            style={{ background: '#1e0d2b', border: '1px solid rgba(240,25,125,0.3)' }}
          >
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">A fantasia de vocês</p>
            <p className="text-white/90 text-sm leading-relaxed">
              <span style={{ color: '#f0197d', fontWeight: 700 }}>{personagemA.nome}</span>
              {' e '}
              <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{personagemB.nome}</span>
              {'. '}
              <span style={{ color: '#ff6b6b', fontWeight: 700 }}>{cenario.nome}</span>
              {' — '}
              {narrativa}
            </p>
            {cenario.descricao && (
              <p className="text-white/50 text-xs mt-3 italic">{cenario.descricao}</p>
            )}
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={shuffle}
            className="w-full font-bold text-lg text-white rounded-2xl active:scale-95 transition-transform"
            style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
          >
            🔀 Embaralhar Tudo
          </button>
        </div>
      </div>
    </div>
  );
}
