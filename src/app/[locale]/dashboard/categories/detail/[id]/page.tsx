import DetailCategories from '@/components/template/DetailCategories'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailCategories id={params.id} />
}
