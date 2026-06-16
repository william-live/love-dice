'use client'

import { useEffect, useState } from 'react'
import { hasConfirmedAge, confirmAge } from '@/lib/store'

export default function AgeGate() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!hasConfirmedAge()) setShow(true)
  }, [])

  if (!show) return null

  function handleConfirm() {
    confirmAge()
    setShow(false)
  }

  function handleLeave() {
    window.location.href = 'https://www.google.com'
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-[430px] rounded-t-3xl px-6 pt-8 pb-10 text-center"
        style={{ background: '#1e0d2b', border: '1px solid #2d1445' }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
          style={{ background: 'rgba(240,25,125,0.15)', border: '1px solid rgba(240,25,125,0.3)' }}
        >
          🔞
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-white mb-2">Conteúdo +18</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          Este aplicativo contém conteúdo adulto para fins lúdicos.
          Ao continuar, você confirma que tem{' '}
          <strong className="text-white">18 anos ou mais</strong> e que está
          de acordo em acessar este conteúdo.
        </p>

        {/* Confirm */}
        <button
          onClick={handleConfirm}
          className="w-full font-bold text-white text-base rounded-2xl mb-3 active:scale-95 transition-transform"
          style={{ minHeight: 56, background: 'linear-gradient(135deg, #f0197d, #8b5cf6)' }}
        >
          ✓ Tenho 18 anos ou mais
        </button>

        {/* Leave */}
        <button
          onClick={handleLeave}
          className="w-full font-medium text-white/40 text-sm py-3 active:opacity-60 transition-opacity"
        >
          Não tenho 18 anos — sair
        </button>
      </div>
    </div>
  )
}
