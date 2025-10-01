import { listLeads } from '@/actions/lead'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'
import { getProfile } from '@/actions/profile'
import ErrorState from '@/components/molecules/ErrorState'

export default async function ListLeadsConsultant({
  searchParams,
}: SearchParams) {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  const errorRequestProfile = responseProfile.error?.message ?? null
  if (errorRequestProfile) {
    return (
      <ErrorState
        title="Erro ao carregar perfil"
        message={String(errorRequestProfile)}
      />
    )
  }
  const response = await listLeads(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    consultantId: profile?.id,
  })
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.message ?? null
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar leads"
        message={String(errorRequest)}
      />
    )
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search errorRequest={errorRequest} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoList}
            list={list}
            listActions={infoList.listActions}
            hrefButton="dashboard/leads/register"
            title="Leads"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
