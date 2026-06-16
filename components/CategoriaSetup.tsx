'use client'

import { useState } from 'react'
import { type Categoria, saveCategorias } from '@/lib/store'

interface CatOption {
  id: Categoria
  emoji: string
  titulo: string
  desc: string
  cor: string
}

const OPTIONS: CatOption[] = [
  {
    id: 'preliminares',
    emoji: '🔥',
    titulo: 'Preliminares',
    desc: 'Beijo, carícias, oral, masturbação, provocações',
    cor: '#f0197d',
  },
  {
    id: 'penetracao',
    emoji: '💦',
    titulo: 'Penetração',
    desc: 'Posições, quickie, sexo convencional e oral recíproco',
    cor: '#8b5cf6',
  },
  {
    id: 'anal',
    emoji: '🍑',
    titulo: 'Anal',
    desc: 'Estimulação anal, penetração anal, brinquedos',
    cor: '#ff6b6b',
  },
  {
    id: 'bdsm',
    emoji: '⛓️',
    titulo: 'BDSM / Sado',
    desc: 'Dominação, submissão, amarração, vendas, ordens',
    cor: '#7c3aed',
  },
]

interface Props {
  onDone: (cats: Categoria[]) => void
  onBack?: () => void
}

export default function CategoriaSetup({ onDone, onBack }: Props) {
  const [selected, setSelected] = useState<Categoria[]>(['preliminares'])

  function toggle(id: Categoria) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function handleDone() {
    const cats = selected.length > 0 ? selected : ['preliminares' as Categoria]
    saveCategorias(cats)
    onDone(cats)
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      <div className="px-5 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-1">
          {onBack && (
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/60 active:scale-90 transition-transform"
              style={{ background: '#1e0d2b' }}
            >
              ←
            </button>
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-white">O que vocês curtem?</h1>
            <p className="text-white/40 text-sm">Ative os conteúdos que queiram nos jogos</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 pb-8 flex flex-col">
        <div className="flex flex-col gap-3 mb-8">
          {OPTIONS.map((opt) => {
            const on = selected.includes(opt.id)
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left active:scale-[0.98] transition-transform"
                style={{
                  background: on ? `rgba(${hexToRgb(opt.cor)},0.12)` : '#1e0d2b',
                  border: on ? `1px solid ${opt.cor}60` : '1px solid #2d1445',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: on ? `rgba(${hexToRgb(opt.cor)},0.2)` : '#120818' }}
                >
                  {opt.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base">{opt.titulo}</p>
                  <p className="text-white/40 text-xs leading-tight mt-0.5">{opt.desc}</p>
                </div>
                <div
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    background: on ? opt.cor : 'transparent',
                    border: on ? `2px solid ${opt.cor}` : '2px solid #2d1445',
                  }}
                >
                  {on && <span className="text-white text-xs font-bold">✓</span>}
                </div>
              </button>
            )
          })}
        </div>

        <p className="text-white/20 text-xs text-center mb-6 px-4">
          Vocês podem alterar isso a qualquer momento na tela inicial
        </p>

        <div className="mt-auto">
          <button
            onClick={handleDone}
            className="w-full font-bold text-white text-lg rounded-2xl active:scale-95 transition-transform"
            style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
          >
            {selected.length === 0
              ? 'Pular (só preliminares) →'
              : `Jogar com ${selected.length} categori${selected.length > 1 ? 'as' : 'a'} →`}
          </button>
        </div>
      </div>
    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
