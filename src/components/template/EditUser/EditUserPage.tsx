import { notFound } from 'next/navigation'
import { getUser } from '@/actions/user'
import { listRoles } from '@/features/roles/api'
import { listPermissions } from '@/features/permissions/api'
import { listServicesAll } from '@/actions/service'
import { listProducts } from '@/actions/product'
import { Button } from '@/components/ui/button'
import { FormLayout } from '@/components/organisms/Form/FormLayout'
import { EditUserForm } from './components/EditUserForm'
import { ToggleUserButton } from '../ListUsers/components/ToggleUserButton'

interface UserEditPageProps {
  params: {
    id: string
  }
}

async function fetchData(userId: string) {
  const [
    userResult,
    rolesResult,
    permissionsResult,
    servicesResult,
    productsResult,
  ] = await Promise.all([
    getUser(userId),
    listRoles(),
    listPermissions(),
    listServicesAll(),
    listProducts(),
  ])

  const user = userResult.ok ? userResult.data : null
  if (!user) {
    notFound()
  }

  return {
    user,
    roles: rolesResult.roles || [],
    permissions: permissionsResult || [],
    services: servicesResult.ok ? servicesResult.data : [],
    products: productsResult.response || [],
  }
}

export default async function EditUserPage({ params }: UserEditPageProps) {
  const { user, roles, permissions, services, products } = await fetchData(
    params.id,
  )
  const formId = 'user-edit-form'

  return (
    <FormLayout
      label="Editar"
      title="Editar Usuário"
      description={`Editando o perfil de ${user.name}`}
      cta={
        <div className="flex flex-row items-center gap-4">
          <div id="user-status" className="pt-2">
            <ToggleUserButton userId={user.id} active={user.active} />
          </div>
          <Button type="submit" form={formId}>
            Salvar Alterações
          </Button>
        </div>
      }
    >
      <EditUserForm
        formId={formId}
        user={user}
        roles={roles}
        permissions={permissions}
        services={services}
        products={products}
      />
    </FormLayout>
  )
}
