import { PointOfSale } from '@/modules/sales-pos/ui'

export default function PublicPointOfSalePage({
  params,
}: {
  params: { id: string; locale: string }
}) {
  return <PointOfSale id={params.id} locale={params.locale} />
}
