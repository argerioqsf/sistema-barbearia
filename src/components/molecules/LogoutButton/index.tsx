'use client'

import { Button } from '@/components/atoms'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  async function onLogout() {
    // TODO: verificar se esse componente e logica de logout não esta duplicada no projeto
    try {
      await fetch('/api/logout', { method: 'POST' })
    } catch {}
    try {
      await signOut({ redirect: true, callbackUrl: '/auth/signin' })
    } catch {}
  }
  return (
    <Button onClick={onLogout} className="bg-red-600 text-white">
      Sair da conta
    </Button>
  )
}
