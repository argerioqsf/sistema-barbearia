import PayCommissionPage from '@/components/template/PayCommission'
import { SearchParams } from '@/types/general'

export default function PayCommissionRoute({ searchParams }: SearchParams) {
  return <PayCommissionPage searchParams={searchParams} />
}
