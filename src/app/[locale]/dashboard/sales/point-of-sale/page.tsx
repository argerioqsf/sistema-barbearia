import { redirect } from 'next/navigation'

export default function LegacyPointOfSaleLanding({
  params,
}: {
  params: { locale: string }
}) {
  redirect(`/${params.locale}/point-of-sale`)
}
