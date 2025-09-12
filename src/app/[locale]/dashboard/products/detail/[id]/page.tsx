import DetailProducts from '@/components/template/DetailProducts'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailProducts id={params.id} />
}
