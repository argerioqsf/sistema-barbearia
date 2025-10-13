import EditUserPage from '@/components/template/EditUser/EditUserPage'

interface PageProps {
  params: {
    id: string
  }
}

export default async function UserDetailPage({ params }: PageProps) {
  return <EditUserPage params={params} />
}
