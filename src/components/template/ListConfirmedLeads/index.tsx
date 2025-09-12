import { documentsConfirmed, listLeads } from '@/actions/lead'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'
import { getProfile } from '@/actions/profile'
import { notFound } from 'next/navigation'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import ErrorState from '@/components/molecules/ErrorState'

export default async function ListConfirmedLeads({
  searchParams,
}: SearchParams) {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  const errorRequestProfile = responseProfile.error?.request ?? null
  if (errorRequestProfile) {
    return (
      <ErrorState
        title="Erro ao carregar perfil"
        message={String(errorRequestProfile)}
      />
    )
  }
  if (!profile) {
    notFound()
  }
  const response = await listLeads(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    matriculation: true,
  })

  if (checkUserPermissions('lead.documents.set', profile.role)) {
    const getForId = infoList.listActions?.find((action) => action.id === 3)
    if (getForId === undefined) {
      infoList.listActions = [
        {
          id: 3,
          icon: 'Check',
          onclick: documentsConfirmed,
          name: 'Confirmar martricula',
          alert: {
            title: 'Você deseja confirmar a entrega dos documentos deste lead?',
            description:
              'Assim que confirmar a entrega dos documentos o pagamento aos indicadores e consultores seram contabilizados',
          },
          toast: {
            title: 'Documentos confirmada com sucesso!',
          },
        },
        ...(infoList.listActions ?? []),
      ]
    }
  }
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.request ?? null
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar leads confirmados"
        message={String(errorRequest)}
      />
    )
  }

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
            textButton=""
            title="Leads Confirmados"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
