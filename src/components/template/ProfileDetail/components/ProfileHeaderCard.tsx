import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Profile } from '@/features/profile/schemas'

type Props = {
  profile: Profile
}

export default function ProfileHeaderCard({ profile }: Props) {
  const name = profile.user?.name ?? 'Usuário'
  const email = profile.user?.email ?? ''
  const active = profile.user?.active ?? true
  const role = profile.role?.name ?? undefined

  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Perfil"
          title={name}
          description={email ? `Conta: ${email}` : undefined}
          right={
            <div className="flex items-center gap-2">
              {role && (
                <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600">
                  {role}
                </span>
              )}
              <span
                className={
                  'rounded-full px-3 py-1 text-xs font-medium ' +
                  (active
                    ? 'bg-emerald-500/10 text-emerald-700'
                    : 'bg-red-500/10 text-red-700')
                }
              >
                {active ? 'Ativo' : 'Desativado'}
              </span>
            </div>
          }
        />
      </PageCardContent>
    </PageCard>
  )
}
