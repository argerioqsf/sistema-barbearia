import { notFound } from 'next/navigation'
import { getProduct } from '@/actions/product'
import { listCategories } from '@/actions/category'
import { FormLayout } from '@/components/organisms/Form/FormLayout'
import { EditProductForm } from './components/EditProductForm'
import { Button } from '@/components/ui/button'

interface ProductEditPageProps {
  params: {
    id: string
  }
}

async function fetchData(productId: string) {
  const [productResult, categoriesResult] = await Promise.all([
    getProduct(productId),
    listCategories(),
  ])

  const product = productResult.response
  if (!product) {
    notFound()
  }

  return {
    product,
    categories: categoriesResult.response || [],
  }
}

export default async function EditProductPage({
  params,
}: ProductEditPageProps) {
  const { product, categories } = await fetchData(params.id)
  const formId = 'product-edit-form'

  return (
    <FormLayout
      label="Editar"
      title="Editar Produto"
      description={`Editando o produto ${product.name}`}
      cta={
        <Button type="submit" form={formId}>
          Salvar Alterações
        </Button>
      }
    >
      <EditProductForm
        formId={formId}
        product={product}
        categories={categories}
      />
    </FormLayout>
  )
}
