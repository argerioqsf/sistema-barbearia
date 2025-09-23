import PointOfSale from '@/components/template/PointOfSale'

export default function POSPage({ params }: { params: { id: string } }) {
  return <PointOfSale id={params.id} />
}
