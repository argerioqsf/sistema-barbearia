import { listCategories } from '@/actions/category'
import { FormLayout } from '@/components/organisms/Form/FormLayout'
import { RegisterServiceForm } from './components/RegisterServiceForm'

export default async function RegisterServicePage() {
  const categoriesResult = await listCategories()

  const categories = categoriesResult.response || []

  return (
    <FormLayout
      label="Cadastro"
      title="Novo Serviço"
      description="Preencha os dados para criar um novo serviço."
    >
      <RegisterServiceForm categories={categories} />
    </FormLayout>
  )
}
