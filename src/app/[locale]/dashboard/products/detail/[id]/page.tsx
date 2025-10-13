import EditProductPage from '@/components/template/EditProduct'

interface ProductEditPageProps {
  params: {
    id: string
  }
}

export default function EditProductRoute({ params }: ProductEditPageProps) {
  return <EditProductPage params={params} />
}
