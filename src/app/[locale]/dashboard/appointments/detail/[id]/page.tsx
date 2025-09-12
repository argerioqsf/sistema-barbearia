import DetailAppointments from '@/components/template/DetailAppointments'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailAppointments id={params.id} />
}
