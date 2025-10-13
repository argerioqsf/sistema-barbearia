import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import FormDashboard from '@/components/organisms/FormDashboard'
import { templateForm } from '../templateForm'
import { updateProfileUser } from '@/actions/profile'
import type { Profile } from '@/features/profile/schemas'
import type { User } from '@/types/general'
import { Button } from '@/components/atoms'

type Props = {
  profile: Profile
}

export default function ProfileFormCard({ profile }: Props) {
  const formId = 'profile-detail-form'
  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Perfil"
          title="Informações pessoais"
          description="Atualize seus dados de contato e preferências."
          right={
            <Button
              form={formId}
              type="submit"
              variant="secondary"
              className="h-10 rounded-xl px-5"
            >
              {templateForm.textButton}
            </Button>
          }
        />
        <div className="mt-6">
          <FormDashboard<Profile | User>
            action={updateProfileUser}
            templateForm={templateForm}
            defaultValues={profile}
            pathSuccess="/dashboard/profile"
            toastInfo={{ title: 'Perfil atualizado com sucesso!' }}
            roleUser={profile.role?.name}
            renderHeader={false}
            formId={formId}
          />
        </div>
      </PageCardContent>
    </PageCard>
  )
}
