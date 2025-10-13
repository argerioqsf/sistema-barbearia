import { redirect } from 'next/navigation'

export default function LegacyPOSPage({
  params,
}: {
  params: { id: string; locale: string }
}) {
  redirect(`/${params.locale}/point-of-sale/${params.id}`)
}
