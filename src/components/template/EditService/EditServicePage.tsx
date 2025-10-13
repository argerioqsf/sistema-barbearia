import { notFound } from 'next/navigation'
import { getService } from '@/actions/service'
import { listCategories } from '@/actions/category'
import { FormLayout } from '@/components/organisms/Form/FormLayout'
import { EditServiceForm } from './components/EditServiceForm'
import { logger } from '@/shared/logger'

interface ServiceEditPageProps {
  params: {
    id: string
  }
}

async function fetchData(serviceId: string) {
  const [serviceResult, categoriesResult] = await Promise.all([
    getService(serviceId),
    listCategories(),
  ])
  logger.debug({ serviceResult }, 'serviceResult')
  logger.debug({ categoriesResult }, 'categoriesResult')

  const service = serviceResult.response
  if (!service) {
    notFound()
  }

  return {
    service,
    categories: categoriesResult.response || [],
  }
}

export default async function EditServicePage({
  params,
}: ServiceEditPageProps) {
  const { service, categories } = await fetchData(params.id)
  const formId = 'service-edit-form'

  return (
    <FormLayout
      label="Editar"
      title="Editar Serviço"
      description={`Editando o serviço ${service.name}`}
    >
      <EditServiceForm
        formId={formId}
        service={service}
        categories={categories}
      />
    </FormLayout>
  )
}
