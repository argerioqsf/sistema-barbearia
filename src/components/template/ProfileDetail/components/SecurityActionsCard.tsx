import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import LogoutButton from '@/components/molecules/LogoutButton'

export default function SecurityActionsCard() {
  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Acesso e segurança"
          title="Sessão"
          description="Gerencie sua sessão atual e opções de acesso."
        />
        <div className="mt-4">
          <LogoutButton />
        </div>
      </PageCardContent>
    </PageCard>
  )
}
