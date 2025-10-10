import { SearchParams } from '@/types/general'
import ListCategories from '@/components/template/ListCategories'

export default function Page({ searchParams }: SearchParams) {
  return <ListCategories searchParams={searchParams} />
}
