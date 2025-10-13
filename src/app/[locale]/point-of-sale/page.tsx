import { PointOfSale } from '@/modules/sales-pos/ui'

export default function PublicPointOfSaleLanding({
  params,
}: {
  params: { locale: string }
}) {
  return <PointOfSale locale={params.locale} />
}
