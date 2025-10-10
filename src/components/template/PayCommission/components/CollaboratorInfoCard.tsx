'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ZUser } from '@/features/users/schemas'

interface CollaboratorInfoCardProps {
  user: ZUser
}

export function CollaboratorInfoCard({ user }: CollaboratorInfoCardProps) {
  const totalBalance = user.profile.totalBalance?.toFixed(2) ?? '0.00'
  const pix = user.profile.pix ?? 'N/A'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Colaborador</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Nome:</span>
          <span>{user.name ?? 'Nome não informado'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Saldo a Pagar:</span>
          <span className="font-semibold text-primary">R$ {totalBalance}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Chave PIX:</span>
          <span>{pix}</span>
        </div>
      </CardContent>
    </Card>
  )
}
