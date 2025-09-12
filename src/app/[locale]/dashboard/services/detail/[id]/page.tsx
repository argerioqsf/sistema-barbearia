import DetailServices from '@/components/template/DetailServices'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailServices id={params.id} />
}
