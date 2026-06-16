'use client'

import { useState, useEffect } from 'react'
import GameCard from '@/components/GameCard'
import PlayerSetup from '@/components/PlayerSetup'
import CategoriaSetup from '@/components/CategoriaSetup'
import { getPlayers, savePlayers, getCategorias, saveCategorias, hasCategorias, SEXO_EMOJI, type Player, type Categoria } from '@/lib/store'

const GAMES = [
  { emoji: '🎲', nome: 'Dado do Amor', descricao: 'Gire o dado 3D e descubra que ação fazer agora.', gradient: 'linear-gradient(135deg, #f0197d, #8b5cf6)', badge: 'A Dois' as const, href: '/jogos/dado' },
  { emoji: '🃏', nome: 'Kama Sutra', descricao: 'Vire as cartas e descubra posições de todos os níveis.', gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', badge: 'A Dois' as const, href: '/jogos/kama-sutra' },
  { emoji: '🍹', nome: 'Eu Nunca', descricao: 'Confissões ousadas para aquecer qualquer noite.', gradient: 'linear-gradient(135deg, #ff6b6b, #ffd93d)', badge: 'Grupo' as const, href: '/jogos/eu-nunca' },
  { emoji: '🎰', nome: 'Roleta Preliminar', descricao: 'Slot de ações, lugares e tempos. Gire e cumpra!', gradient: 'linear-gradient(135deg, #f0197d, #ff6b6b)', badge: 'A Dois' as const, href: '/jogos/roleta' },
  { emoji: '🎭', nome: 'Gerador de Fantasia', descricao: 'Personagens e cenários aleatórios para roleplay íntimo.', gradient: 'linear-gradient(135deg, #8b5cf6, #f0197d)', badge: 'A Dois' as const, href: '/jogos/fantasia' },
  { emoji: '💭', nome: 'Verdade ou Desafio', descricao: 'A versão quente com 3 níveis de intensidade.', gradient: 'linear-gradient(135deg, #10b981, #8b5cf6)', badge: 'Grupo' as const, href: '/jogos/verdade-desafio' },
  { emoji: '🔐', nome: 'Missão Secreta', descricao: 'Cada um recebe uma missão oculta para executar.', gradient: 'linear-gradient(135deg, #1e293b, #8b5cf6)', badge: 'Grupo' as const, href: '/jogos/missao-secreta' },
  { emoji: '❤️', nome: 'Intimidade', descricao: 'Perguntas de conexão profunda para casais.', gradient: 'linear-gradient(135deg, #f0197d, #ff6b6b)', badge: 'A Dois' as const, href: '/jogos/intimidade' },
]

const CAT_EMOJI: Record<Categoria, string> = {
  preliminares: '🔥',
  penetracao: '💦',
  anal: '🍑',
  bdsm: '⛓️',
}

type View = 'setup-players' | 'setup-categorias' | 'home' | 'edit-players' | 'edit-categorias'

export default function HomePage() {
  const [view, setView] = useState<View>('home')
  const [players, setPlayers] = useState<Player[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>(['preliminares'])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = getPlayers()
    const cats = getCategorias()
    const hasCats = hasCategorias()
    setPlayers(saved)
    setCategorias(cats)
    if (saved.length === 0) {
      setView('setup-players')
    } else if (!hasCats) {
      setView('setup-categorias')
    } else {
      setView('home')
    }
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (view === 'setup-players') {
    return (
      <PlayerSetup
        onDone={(p) => { setPlayers(p); setView('setup-categorias') }}
      />
    )
  }

  if (view === 'setup-categorias') {
    return (
      <CategoriaSetup
        onBack={players.length === 0 ? undefined : () => setView('setup-players')}
        onDone={(cats) => { setCategorias(cats); setView('home') }}
      />
    )
  }

  if (view === 'edit-players') {
    return (
      <PlayerSetup
        initial={players}
        onDone={(p) => { savePlayers(p); setPlayers(p); setView('home') }}
        onCancel={() => setView('home')}
      />
    )
  }

  if (view === 'edit-categorias') {
    return (
      <CategoriaSetup
        onBack={() => setView('home')}
        onDone={(cats) => { saveCategorias(cats); setCategorias(cats); setView('home') }}
      />
    )
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#120818' }}>
      {/* Header */}
      <div className="px-4 pt-10 pb-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-4xl">🎲</span>
          <h1 className="text-3xl font-extrabold gradient-text">Love Dice</h1>
          <span
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: 'rgba(240,25,125,0.2)', color: '#f0197d', border: '1px solid rgba(240,25,125,0.4)' }}
          >
            +18
          </span>
        </div>
        <p className="text-white/40 text-sm mb-3">Jogos íntimos para esquentar a noite ✨</p>

        {/* Players bar */}
        <button
          onClick={() => setView('edit-players')}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl active:scale-95 transition-transform mb-2"
          style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
        >
          <div className="flex gap-1 flex-wrap flex-1">
            {players.map((p, i) => (
              <span key={i} className="flex items-center gap-1 text-sm text-white/80 font-medium">
                <span>{SEXO_EMOJI[p.sexo]}</span>
                <span>{p.nome}</span>
                {i < players.length - 1 && <span className="text-white/20 mx-1">·</span>}
              </span>
            ))}
          </div>
          <span className="text-white/30 text-xs shrink-0">✏️</span>
        </button>

        {/* Categorias bar */}
        <button
          onClick={() => setView('edit-categorias')}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl active:scale-95 transition-transform"
          style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
        >
          <div className="flex gap-1.5 flex-wrap flex-1">
            {categorias.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)' }}
              >
                {CAT_EMOJI[c]} {c}
              </span>
            ))}
          </div>
          <span className="text-white/30 text-xs shrink-0">✏️</span>
        </button>
      </div>

      {/* Games grid */}
      <div className="flex-1 px-4 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {GAMES.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </div>

      <div className="text-center pb-6 px-4">
        <p className="text-white/20 text-xs">Jogue com responsabilidade · Apenas para maiores de 18 anos</p>
      </div>
    </div>
  )
}
