import DetailCoupons from '@/components/template/DetailCoupons'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailCoupons id={params.id} />
}
