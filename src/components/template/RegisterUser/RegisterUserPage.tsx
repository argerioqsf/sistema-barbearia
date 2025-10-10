import { listRoles } from '@/features/roles/api'
import { listPermissionsAction } from '@/actions/permission'
import { listServicesAll } from '@/actions/service'
import { listProducts } from '@/actions/product'
import { RegisterUserForm } from './components/RegisterUserForm'
import { FormLayout } from '@/components/organisms/Form/FormLayout'

export default async function RegisterUserPage() {
  const { roles } = await listRoles()
  const permissionsResult = await listPermissionsAction()
  const servicesResult = await listServicesAll()
  const productsResult = await listProducts()

  if (!permissionsResult.ok) {
    console.error('Erro ao buscar permissões:', permissionsResult.error)
  }

  if (!servicesResult.ok) {
    console.error('Erro ao buscar serviços:', servicesResult.error)
  }

  if (!productsResult.response) {
    console.error('Erro ao buscar produtos:', productsResult.error)
  }

  const permissions = permissionsResult.ok ? permissionsResult.data : []
  const services = servicesResult.ok ? servicesResult.data : []
  const products = productsResult.response ? productsResult.response : []

  return (
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
  )
}
