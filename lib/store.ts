export type Orientacao = 'hetero' | 'gay' | 'bi'
export type Categoria = 'preliminares' | 'penetracao' | 'anal' | 'bdsm'
export type PairType = 'hetero' | 'MM' | 'FF' | 'mixed'

export interface Player {
  nome: string
  sexo: 'M' | 'F' | 'O'
  orientacao: Orientacao
}

const KEY_PLAYERS = 'ld_players'
const KEY_AGE = 'ld_age_ok'
const KEY_CATEGORIAS = 'ld_categorias'

export function getPlayers(): Player[] {
  if (typeof window === 'undefined') return []
  try {
    const data = JSON.parse(localStorage.getItem(KEY_PLAYERS) || '[]')
    return data.map((p: { nome: string; sexo: Player['sexo']; orientacao?: Orientacao }) => ({
      nome: p.nome,
      sexo: p.sexo,
      orientacao: p.orientacao ?? ('hetero' as Orientacao),
    }))
  } catch {
    return []
  }
}

export function savePlayers(players: Player[]): void {
  localStorage.setItem(KEY_PLAYERS, JSON.stringify(players))
}

export function hasConfirmedAge(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(KEY_AGE) === '1'
}

export function confirmAge(): void {
  localStorage.setItem(KEY_AGE, '1')
}

export function getCategorias(): Categoria[] {
  if (typeof window === 'undefined') return ['preliminares']
  const val = localStorage.getItem(KEY_CATEGORIAS)
  if (val === null) return ['preliminares']
  try { return JSON.parse(val) } catch { return ['preliminares'] }
}

export function saveCategorias(cats: Categoria[]): void {
  localStorage.setItem(KEY_CATEGORIAS, JSON.stringify(cats))
}

export function hasCategorias(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(KEY_CATEGORIAS) !== null
}

export function getPairType(players: Player[]): PairType {
  const sexos = players.map((p) => p.sexo)
  const hasM = sexos.includes('M')
  const hasF = sexos.includes('F')
  const hasO = sexos.includes('O')
  if (hasO) return 'mixed'
  if (hasM && hasF) return 'hetero'
  if (hasM) return 'MM'
  if (hasF) return 'FF'
  return 'mixed'
}

export function interpolar(texto: string, players: Player[]): string {
  if (players.length === 0) return texto
  const A = players[0]
  const B = players[1] ?? players[0]
  const emP = (p: Player) => p.sexo === 'F' ? `na ${p.nome}` : p.sexo === 'M' ? `no ${p.nome}` : `em ${p.nome}`
  const daP = (p: Player) => p.sexo === 'F' ? `da ${p.nome}` : p.sexo === 'M' ? `do ${p.nome}` : `de ${p.nome}`
  const artP = (p: Player) => p.sexo === 'F' ? 'a' : p.sexo === 'M' ? 'o' : ''
  const eleP = (p: Player) => p.sexo === 'F' ? 'ela' : p.sexo === 'M' ? 'ele' : 'você'
  return texto
    .replace(/\{A\}/g, A.nome)
    .replace(/\{B\}/g, B.nome)
    .replace(/\{emA\}/g, emP(A))
    .replace(/\{emB\}/g, emP(B))
    .replace(/\{daA\}/g, daP(A))
    .replace(/\{daB\}/g, daP(B))
    .replace(/\{artA\}/g, artP(A))
    .replace(/\{artB\}/g, artP(B))
    .replace(/\{eleA\}/g, eleP(A))
    .replace(/\{eleB\}/g, eleP(B))
}

export const SEXO_EMOJI: Record<Player['sexo'], string> = { M: '👨', F: '👩', O: '🧑' }
export const SEXO_LABEL: Record<Player['sexo'], string> = { M: 'Homem', F: 'Mulher', O: 'Outro' }
export const ORIENTACAO_LABEL: Record<Orientacao, string> = {
  hetero: 'Hetero',
  gay: 'Gay / Lésbica',
  bi: 'Bi / Pan',
}
export const ORIENTACAO_EMOJI: Record<Orientacao, string> = {
  hetero: '♀♂',
  gay: '🏳️‍🌈',
  bi: '💜',
}
