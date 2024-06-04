import { listLeads, matriculationConfirmed } from '@/actions/lead'
import { getProfile } from '@/actions/profile'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { notFound } from 'next/navigation'
import { infoList } from './templates'

export default async function ListWaitingConfirmationLeads({
  searchParams,
}: SearchParams) {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  const errorRequestProfile = responseProfile.error?.request ?? null
  if (!profile) {
    notFound()
  }
  const response = await listLeads(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    consultantId: 'notnull',
    matriculation: false,
  })

  if (checkUserPermissions('lead.matriculation.set', profile.role)) {
    const getForId = infoList.listActions?.find((action) => action.id === 3)
    if (getForId === undefined) {
      infoList.listActions = [
        {
          id: 3,
          icon: 'Check',
          onclick: matriculationConfirmed,
          name: 'Confirmar martricula',
          alert: {
            title: 'Você deseja confirmar a matricula deste lead?',
            description:
              'Assim que confirmar a matricula poderá velo na listagem de leads confirmados',
          },
          toast: {
            title: 'Matricula confirmada com sucesso!',
          },
        },
        ...(infoList.listActions ?? []),
      ]
    }
  }

  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search errorRequest={errorRequest ?? errorRequestProfile} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoList}
            list={list}
            listActions={infoList.listActions}
            hrefButton="dashboard/leads/register"
            textButton="Novo lead"
            title="Leads Aguardando Confirmação"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
