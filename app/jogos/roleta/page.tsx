'use client';

import { useState, useEffect, useRef } from 'react';
import BackHeader from '@/components/BackHeader';
import { getRoletaFaseContent, DADO_FASES_INFO, ROLETA_TEMPO, type FaseSexo } from '@/lib/games-data';
import { getCategorias, getPlayers } from '@/lib/store';

export default function RoletaPage() {
  const [fase, setFase] = useState<FaseSexo>(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ acao: string; onde: string; tempo: { label: string; segundos: number }; playerA: string; playerB: string } | null>(null);
  const [displayAcao, setDisplayAcao] = useState('');
  const [displayOnde, setDisplayOnde] = useState('');
  const [displayTempo, setDisplayTempo] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [cats, setCats] = useState<ReturnType<typeof getCategorias>>([]);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  useEffect(() => {
    const c = getCategorias();
    setCats(c);
    const { acoes, onde } = getRoletaFaseContent(1, c);
    setDisplayAcao(acoes[0] || '');
    setDisplayOnde(onde[0] || '');
    setDisplayTempo(ROLETA_TEMPO[0].label);
    setPlayerNames(getPlayers().map((p) => p.nome));
  }, []);

  const faseInfo = DADO_FASES_INFO.find((f) => f.fase === fase)!;

  const spin = () => {
    const { acoes, onde } = getRoletaFaseContent(fase, cats);
    if (isSpinning || acoes.length === 0) return;
    setIsSpinning(true);
    setResult(null);
    setCountdown(null);
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const acao = acoes[Math.floor(Math.random() * acoes.length)];
    const o = onde[Math.floor(Math.random() * onde.length)];
    const tempo = ROLETA_TEMPO[Math.floor(Math.random() * ROLETA_TEMPO.length)];
    const shuffled = Math.random() > 0.5 ? [...playerNames] : [...playerNames].reverse();
    const pA = shuffled[0] || '';
    const pB = shuffled[1] || shuffled[0] || '';

    let tick = 0;
    const interval = setInterval(() => {
      setDisplayAcao(acoes[Math.floor(Math.random() * acoes.length)]);
      setDisplayOnde(onde[Math.floor(Math.random() * onde.length)]);
      setDisplayTempo(ROLETA_TEMPO[Math.floor(Math.random() * ROLETA_TEMPO.length)].label);
      tick++;
      if (tick > 15) {
        clearInterval(interval);
        setDisplayAcao(acao);
        setDisplayOnde(o);
        setDisplayTempo(tempo.label);
        setResult({ acao, onde: o, tempo, playerA: pA, playerB: pB });
        setIsSpinning(false);
      }
    }, 80);
  };

  const startTimer = () => {
    if (!result || timerActive) return;
    setCountdown(result.tempo.segundos);
    setTimerActive(true);
  };

  useEffect(() => {
    if (timerActive && countdown !== null) {
      if (countdown <= 0) {
        setTimerActive(false);
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([200, 100, 200]);
        return;
      }
      timerRef.current = setInterval(() => {
        setCountdown((c) => (c !== null ? c - 1 : null));
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [timerActive, countdown]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}:${sec.toString().padStart(2, '0')}` : `${sec}s`;
  };

  const avancarFase = () => {
    if (fase < 4) {
      const next = (fase + 1) as FaseSexo;
      setFase(next);
      setResult(null);
      const { acoes, onde } = getRoletaFaseContent(next, cats);
      setDisplayAcao(acoes[0] || '');
      setDisplayOnde(onde[0] || '');
    }
  };

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <BackHeader title="Roleta" emoji="🎰" />

      <div className="flex-1 flex flex-col items-center px-4 pt-20 pb-6">

        {/* Phase stepper */}
        <div className="w-full mb-5">
          <div className="flex justify-between mb-2">
            {DADO_FASES_INFO.map((f) => (
              <button
                key={f.fase}
                onClick={() => { setFase(f.fase); setResult(null); const { acoes, onde } = getRoletaFaseContent(f.fase, cats); setDisplayAcao(acoes[0] || ''); setDisplayOnde(onde[0] || ''); }}
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
          <div className="relative h-1 rounded-full mx-4" style={{ background: '#1e0d2b' }}>
            <div
              className="absolute top-0 left-0 h-1 rounded-full transition-all duration-500"
              style={{ width: `${((fase - 1) / 3) * 100}%`, background: faseInfo.cor }}
            />
          </div>
          <p className="text-center text-xs mt-2" style={{ color: faseInfo.cor }}>{faseInfo.sublabel}</p>
        </div>

        {/* Slot Machine */}
        <div className="w-full rounded-2xl p-4 mb-4" style={{ background: '#1e0d2b', border: `1px solid ${faseInfo.cor}40` }}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Ação', val: displayAcao },
              { label: 'Onde', val: displayOnde },
              { label: 'Tempo', val: displayTempo },
            ].map(({ label, val }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-white/40 text-xs uppercase tracking-wider">{label}</span>
                <div className="w-full rounded-xl flex items-center justify-center py-4 text-center" style={{ background: '#120818', border: `1px solid ${faseInfo.cor}40`, minHeight: 72 }}>
                  <span className={`text-white text-xs font-bold leading-tight px-1 ${isSpinning ? 'opacity-60' : ''}`}>{val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {result && !isSpinning && (
          <div className="w-full rounded-2xl p-4 mb-3 fade-in-up text-center" style={{ background: `${faseInfo.cor}18`, border: `1px solid ${faseInfo.cor}60` }}>
            {result.playerA && <p className="text-white/50 text-xs mb-1">{result.playerA} → {result.playerB}</p>}
            <p className="text-white text-base font-semibold">
              <span style={{ color: faseInfo.cor }}>{result.acao}</span>
              {result.playerB && <span className="text-white"> {result.playerB}</span>}
              {' '}<span className="text-white/70">{result.onde}</span>
              {' '}<span style={{ color: '#8b5cf6' }}>por {result.tempo.label}</span>
            </p>
          </div>
        )}

        {result && !isSpinning && (
          <div className="w-full mb-3">
            {countdown !== null ? (
              <div className="text-center py-3">
                <div className="text-5xl font-extrabold mb-1" style={{ color: countdown <= 10 ? '#ff4757' : faseInfo.cor }}>
                  {formatTime(countdown)}
                </div>
                {countdown === 0 && <p className="text-white/60 text-sm">⏰ Tempo esgotado!</p>}
              </div>
            ) : (
              <button onClick={startTimer} className="w-full font-semibold text-white rounded-xl py-3 active:scale-95 transition-transform" style={{ background: '#1e0d2b', border: `1px solid ${faseInfo.cor}`, color: faseInfo.cor }}>
                ⏱️ Iniciar Timer ({result.tempo.label})
              </button>
            )}
          </div>
        )}

        <div className="flex gap-3 w-full mt-auto">
          <button
            onClick={spin}
            disabled={isSpinning}
            className="flex-1 font-bold text-lg text-white rounded-2xl transition-all active:scale-95 disabled:opacity-70"
            style={{ minHeight: 56, background: isSpinning ? '#2d1445' : `linear-gradient(135deg, ${faseInfo.cor}, #8b5cf6)` }}
          >
            {isSpinning ? '🎰 Girando...' : result ? '🔄 Nova Rodada' : '🎰 Girar'}
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
      </div>
    </div>
  );
}
