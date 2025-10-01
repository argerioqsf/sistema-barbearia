import { PointOfSale } from '@/modules/sales-pos/ui'

export default function POSPage({ params }: { params: { id: string } }) {
  return <PointOfSale id={params.id} />
}
