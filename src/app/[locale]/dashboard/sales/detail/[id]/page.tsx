import DetailSales from '@/components/template/DetailSales'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailSales id={params.id} />
}
