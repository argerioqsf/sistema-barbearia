import DetailBarbers from '@/components/template/DetailBarbers'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailBarbers id={params.id} />
}
