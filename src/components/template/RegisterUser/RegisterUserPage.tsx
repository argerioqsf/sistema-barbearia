import { listRoles } from '@/features/roles/api'
import { listPermissionsAction } from '@/actions/permission'
import { listServicesAll } from '@/actions/service'
import { listProducts } from '@/actions/product'
import { RegisterUserForm } from './components/RegisterUserForm'
import { FormLayout } from '@/components/organisms/Form/FormLayout'
import { logger } from '@/shared/logger'
import { cn } from '@/lib/utils'

export default async function RegisterUserPage() {
  const roles = await listRoles()
  const permissionsResult = await listPermissionsAction()
  const servicesResult = await listServicesAll()
  const productsResult = await listProducts()

  if (!permissionsResult.ok) {
    logger.debug(
      {
        error: permissionsResult.error,
      },
      'Erro ao buscar permissões:',
    )
  }

  if (!servicesResult.ok) {
    logger.debug(
      {
        error: servicesResult.error,
      },
      'Erro ao buscar serviços:',
    )
  }

  if (!productsResult.response) {
    logger.debug(
      {
        error: productsResult.error,
      },
      'Erro ao buscar produtos:',
    )
  }

  const permissions = permissionsResult.ok ? permissionsResult.data : []
  const services = servicesResult.ok ? servicesResult.data : []
  const products = productsResult.response ? productsResult.response : []

  return (
    <div className={cn('px-6 py-6 pb-16', 'sm:px-8 sm:py-8 sm:pb-20')}>
      <FormLayout
        label="Cadastro"
        title="Novo Usuário"
        description="Preencha os dados para criar um novo usuário."
      >
        <RegisterUserForm
          roles={roles}
          permissions={permissions}
          services={services}
          products={products}
        />
      </FormLayout>
    </div>
  )
}
