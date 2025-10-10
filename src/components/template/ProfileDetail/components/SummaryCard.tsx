import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Profile } from '@/features/profile/schemas'

type Props = {
  profile: Profile
}

function initials(name?: string) {
  if (!name) return 'U'
  const parts = name.trim().split(' ')
  const first = parts[0]?.[0]
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : ''
  return (first + last).toUpperCase()
}

export default function SummaryCard({ profile }: Props) {
  const name = profile.user?.name ?? 'Usuário'
  const email = profile.user?.email ?? ''
  const phone = profile.phone
  const role = profile.role?.name

  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader label="Resumo" title="Informações do Perfil" />
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarFallback className="bg-slate-200 text-slate-700">
              {initials(name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-slate-900">{name}</p>
            {email && <p className="text-sm text-slate-500">{email}</p>}
          </div>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-slate-600">
          {role && (
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Função</span>
              <span className="font-medium text-slate-800">{role}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Whatsapp</span>
              <span className="font-medium text-slate-800">{phone}</span>
            </div>
          )}
          {/* Campos adicionais podem ser exibidos aqui conforme disponíveis no schema */}
        </div>
      </PageCardContent>
    </PageCard>
  )
}
