import DetailDebts from '@/components/template/DetailDebts'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailDebts id={params.id} />
}
