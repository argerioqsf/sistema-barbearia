import { listCategories } from '@/actions/category'
import { FormLayout } from '@/components/organisms/Form/FormLayout'
import { RegisterProductForm } from './components/RegisterProductForm'

export default async function RegisterProductPage() {
  const categoriesResult = await listCategories()

  const categories = categoriesResult.response || []

  return (
    <FormLayout
      label="Cadastro"
      title="Novo Produto"
      description="Preencha os dados para criar um novo produto."
    >
      <RegisterProductForm categories={categories} />
    </FormLayout>
  )
}
