import EditServicePage from '@/components/template/EditService'

interface ServiceEditPageProps {
  params: {
    id: string
  }
}

export default function EditServiceRoute({ params }: ServiceEditPageProps) {
  return <EditServicePage params={params} />
}
