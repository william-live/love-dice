'use client'

import { useState } from 'react'
import { type Player, SEXO_EMOJI, SEXO_LABEL, ORIENTACAO_LABEL, savePlayers } from '@/lib/store'

interface Props {
  initial?: Player[]
  onDone: (players: Player[]) => void
  onCancel?: () => void
}

export default function PlayerSetup({ initial = [], onDone, onCancel }: Props) {
  const [players, setPlayers] = useState<Player[]>(initial)
  const [nome, setNome] = useState('')
  const [sexo, setSexo] = useState<Player['sexo']>('F')
  const [orientacao, setOrientacao] = useState<Player['orientacao']>('hetero')

  function addPlayer() {
    const n = nome.trim()
    if (!n || players.length >= 6) return
    setPlayers((prev) => [...prev, { nome: n, sexo, orientacao }])
    setNome('')
    setSexo('F')
    setOrientacao('hetero')
  }

  function removePlayer(i: number) {
    setPlayers((prev) => prev.filter((_, idx) => idx !== i))
  }

  function handleDone() {
    savePlayers(players)
    onDone(players)
  }

  const canAdd = nome.trim().length > 0 && players.length < 6
  const canDone = players.length >= 1

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <div className="px-5 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-1">
          {onCancel && (
            <button
              onClick={onCancel}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/60 active:scale-90 transition-transform"
              style={{ background: '#1e0d2b' }}
            >
              ←
            </button>
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-white">Quem vai jogar?</h1>
            <p className="text-white/40 text-sm">Adicione até 6 jogadores</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 pb-8 flex flex-col">
        <div className="rounded-2xl p-4 mb-4" style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}>
          {/* Nome */}
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Nome</p>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            placeholder="Ex: Ana, Carlos..."
            maxLength={20}
            className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none mb-4 text-base"
            style={{ background: '#120818', border: '1px solid #2d1445' }}
          />

          {/* Sexo */}
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Sexo</p>
          <div className="flex gap-2 mb-4">
            {(['F', 'M', 'O'] as Player['sexo'][]).map((s) => (
              <button
                key={s}
                onClick={() => setSexo(s)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                style={{
                  background: sexo === s ? 'rgba(240,25,125,0.2)' : '#120818',
                  border: sexo === s ? '1px solid rgba(240,25,125,0.5)' : '1px solid #2d1445',
                  color: sexo === s ? '#f0197d' : 'rgba(255,255,255,0.5)',
                }}
              >
                <span>{SEXO_EMOJI[s]}</span>
                <span>{SEXO_LABEL[s]}</span>
              </button>
            ))}
          </div>

          {/* Orientação */}
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Orientação</p>
          <div className="flex gap-2 mb-4">
            {(['hetero', 'gay', 'bi'] as Player['orientacao'][]).map((o) => (
              <button
                key={o}
                onClick={() => setOrientacao(o)}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all active:scale-95"
                style={{
                  background: orientacao === o ? 'rgba(139,92,246,0.2)' : '#120818',
                  border: orientacao === o ? '1px solid rgba(139,92,246,0.5)' : '1px solid #2d1445',
                  color: orientacao === o ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                }}
              >
                {ORIENTACAO_LABEL[o]}
              </button>
            ))}
          </div>

          <button
            onClick={addPlayer}
            disabled={!canAdd}
            className="w-full font-bold text-white rounded-xl py-3 active:scale-95 transition-transform disabled:opacity-40 text-sm"
            style={{ background: canAdd ? 'linear-gradient(135deg, #f0197d, #8b5cf6)' : '#2d1445' }}
          >
            + Adicionar jogador
          </button>
        </div>

        {players.length > 0 && (
          <div className="flex flex-col gap-2 mb-6">
            {players.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
              >
                <span className="text-xl">{SEXO_EMOJI[p.sexo]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{p.nome}</p>
                  <p className="text-white/30 text-xs">{SEXO_LABEL[p.sexo]} · {ORIENTACAO_LABEL[p.orientacao]}</p>
                </div>
                <button
                  onClick={() => removePlayer(i)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 active:scale-90 transition-all"
                  style={{ background: '#2d1445' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {players.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <span className="text-5xl mb-3">👥</span>
            <p className="text-white/30 text-sm">Nenhum jogador ainda.<br />Adicione pelo menos 1 para continuar.</p>
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={handleDone}
            disabled={!canDone}
            className="w-full font-bold text-white text-lg rounded-2xl active:scale-95 transition-transform disabled:opacity-40"
            style={{ minHeight: 56, background: canDone ? 'linear-gradient(135deg, #f0197d, #8b5cf6)' : '#2d1445' }}
          >
            {canDone ? `Continuar com ${players.length} jogador${players.length > 1 ? 'es' : ''} →` : 'Adicione pelo menos 1 jogador'}
          </button>
        </div>
      </div>
    </div>
  )
}
