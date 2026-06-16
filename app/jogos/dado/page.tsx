'use client';

import { useState, useCallback, useEffect } from 'react';
import BackHeader from '@/components/BackHeader';
import { getDadoFaseFaces, DADO_FASES_INFO, type DadoFace, type FaseSexo } from '@/lib/games-data';
import { getCategorias, getPlayers, interpolar, type Player } from '@/lib/store';

export default function DadoPage() {
  const [fase, setFase] = useState<FaseSexo>(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<DadoFace | null>(null);
  const [history, setHistory] = useState<DadoFace[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [cats, setCats] = useState<ReturnType<typeof getCategorias>>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setCats(getCategorias());
    setPlayers(getPlayers());
  }, []);

  const faseInfo = DADO_FASES_INFO.find((f) => f.fase === fase)!;

  const spin = useCallback(() => {
    const faces = getDadoFaseFaces(fase, cats);
    if (isSpinning || faces.length === 0) return;
    setIsSpinning(true);
    setResult(null);

    const newRot = {
      x: rotation.x + 360 + Math.floor(Math.random() * 360),
      y: rotation.y + 360 + Math.floor(Math.random() * 360),
      z: rotation.z + Math.floor(Math.random() * 90),
    };
    setRotation(newRot);

    setTimeout(() => {
      const rawFace = faces[Math.floor(Math.random() * faces.length)];
      const shuffledPlayers = Math.random() > 0.5 ? [...players] : [...players].reverse();
      const face = { ...rawFace, descricao: interpolar(rawFace.descricao, shuffledPlayers) };
      setResult(face);
      setHistory((prev) => [face, ...prev].slice(0, 5));
      setIsSpinning(false);
    }, 1000);
  }, [isSpinning, rotation, fase, cats, players]);

  const avancarFase = () => {
    if (fase < 4) {
      setFase((f) => (f + 1) as FaseSexo);
      setResult(null);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <BackHeader title="Dado do Amor" emoji="🎲" />

      <div className="flex-1 flex flex-col items-center px-4 pt-20 pb-6">

        {/* Phase stepper */}
        <div className="w-full mb-6">
          <div className="flex justify-between mb-2">
            {DADO_FASES_INFO.map((f) => (
              <button
                key={f.fase}
                onClick={() => { setFase(f.fase); setResult(null); }}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: fase === f.fase ? f.cor : fase > f.fase ? `${f.cor}50` : '#1e0d2b',
                    border: `2px solid ${fase >= f.fase ? f.cor : '#2d1445'}`,
                    color: 'white',
                  }}
                >
                  {fase > f.fase ? '✓' : f.emoji}
                </div>
                <span className="text-xs font-semibold" style={{ color: fase === f.fase ? f.cor : 'rgba(255,255,255,0.3)' }}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
          {/* Progress line */}
          <div className="relative h-1 rounded-full mx-4" style={{ background: '#1e0d2b' }}>
            <div
              className="absolute top-0 left-0 h-1 rounded-full transition-all duration-500"
              style={{ width: `${((fase - 1) / 3) * 100}%`, background: faseInfo.cor }}
            />
          </div>
          <p className="text-center text-xs mt-2" style={{ color: faseInfo.cor }}>
            {faseInfo.sublabel}
          </p>
        </div>

        {/* 3D Dice */}
        <div className="flex items-center justify-center mb-6" style={{ perspective: '800px', height: 200 }}>
          <div
            style={{
              width: 160,
              height: 160,
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              transition: isSpinning ? 'transform 1s cubic-bezier(0.36,0.07,0.19,0.97)' : 'transform 0.3s ease',
            }}
          >
            {['💋','💦','🔥','😈','⚡','🎁'].map((em, i) => {
              const transforms = [
                `translateZ(80px)`, `rotateY(180deg) translateZ(80px)`,
                `rotateY(90deg) translateZ(80px)`, `rotateY(-90deg) translateZ(80px)`,
                `rotateX(90deg) translateZ(80px)`, `rotateX(-90deg) translateZ(80px)`,
              ];
              return (
                <div key={i} style={{
                  position: 'absolute', width: 160, height: 160,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 52, background: `linear-gradient(135deg, ${faseInfo.cor}, #8b5cf6)`,
                  borderRadius: 20, border: '2px solid rgba(255,255,255,0.2)',
                  transform: transforms[i], backfaceVisibility: 'hidden',
                }}>{em}</div>
              );
            })}
          </div>
        </div>

        {/* Result Card */}
        {result && !isSpinning && (
          <div
            className="w-full rounded-2xl p-5 mb-4 fade-in-up"
            style={{ background: '#1e0d2b', border: `2px solid ${result.cor}`, boxShadow: `0 0 30px ${result.cor}40` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{result.emoji}</span>
              <div>
                <h2 className="text-xl font-bold" style={{ color: result.cor }}>{result.nome}</h2>
                <p className="text-white/50 text-xs">{faseInfo.emoji} {faseInfo.label}</p>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">{result.descricao}</p>
          </div>
        )}

        <div className="flex gap-3 w-full">
          <button
            onClick={spin}
            disabled={isSpinning}
            className="flex-1 font-bold text-lg text-white rounded-2xl transition-all active:scale-95 disabled:opacity-70"
            style={{ minHeight: 56, background: isSpinning ? '#2d1445' : `linear-gradient(135deg, ${faseInfo.cor}, #8b5cf6)` }}
          >
            {isSpinning ? '🎲 Girando...' : '🎲 Girar'}
          </button>
          {fase < 4 && (
            <button
              onClick={avancarFase}
              className="px-4 font-semibold text-white rounded-2xl active:scale-95 transition-transform"
              style={{ minHeight: 56, background: '#1e0d2b', border: `1px solid ${DADO_FASES_INFO[fase].cor}`, color: DADO_FASES_INFO[fase].cor }}
            >
              {DADO_FASES_INFO[fase].emoji} Próxima
            </button>
          )}
        </div>

        {history.length > 0 && (
          <div className="w-full mt-5">
            <p className="text-white/40 text-xs mb-2 uppercase tracking-wider">Últimas rodadas</p>
            <div className="flex gap-2 flex-wrap">
              {history.map((h, i) => (
                <div key={i} className="flex items-center gap-1 px-3 py-1 rounded-full text-sm" style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}>
                  <span>{h.emoji}</span>
                  <span className="text-white/60 text-xs">{h.nome}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
