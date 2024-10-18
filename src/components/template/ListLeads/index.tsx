import { arquivarLead, listLeads } from '@/actions/lead'
import { getProfile } from '@/actions/profile'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { Option, SearchParams } from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { notFound } from 'next/navigation'
import { infoList } from './templates'
import Filter from '@/components/molecules/Filter'
import { listSelectSegments } from '@/actions/segments'
import { listSelectCourses } from '@/actions/course'

export default async function ListLeads({ searchParams }: SearchParams) {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  const errorRequestProfile = responseProfile.error?.request ?? null
  if (!profile) {
    notFound()
  }

  const responseSegments = await listSelectSegments()
  const segments = responseSegments?.response ?? []
  const errorRequestSegment = responseSegments.error?.request ?? null
  const optionsSegment: Option[] = segments.map((option) => {
    return {
      label: option.name,
      value: option.id,
    }
  })

  const responseCourses = await listSelectCourses()
  const courses = responseCourses?.response ?? []
  const errorRequestCourse = responseSegments.error?.request ?? null
  const optionsCourse: Option[] = courses.map((option) => {
    return {
      label: option.name,
      value: option.id,
    }
  })

  if (checkUserPermissions('lead.archived.set', profile.role)) {
    const getForId = infoList.listActions?.find((action) => action.id === 1)
    if (getForId === undefined) {
      infoList.listActions = [
        {
          id: 1,
          icon: 'Archive',
          onclick: arquivarLead,
          name: 'Arquivar',
          alert: {
            title: 'Você deseja realmente arquivar este lead?',
            description: 'Você ainda podera velo na tela de leads arquivados',
          },
          toast: {
            title: 'Lead arquivado com sucesso!',
          },
        },
        ...(infoList.listActions ?? []),
      ]
    }
  }

  const response = await listLeads(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    archived: false,
    segmentId: searchParams?.segmentId ?? '',
    courseId: searchParams?.courseId ?? '',
    phone: searchParams?.phone ?? '',
  })
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
          <Search
            placeholder="Nome"
            errorRequest={errorRequest ?? errorRequestProfile}
          />
          <Search
            placeholder="Numero"
            paramsName="phone"
            errorRequest={errorRequest ?? errorRequestProfile}
          />
          <Filter
            paramsName="segmentId"
            placeholder="Segmento"
            errorRequest={errorRequestSegment ?? errorRequestProfile}
            options={optionsSegment}
          />
          <Filter
            paramsName="courseId"
            placeholder="Curso"
            errorRequest={errorRequestCourse ?? errorRequestProfile}
            options={optionsCourse}
          />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoList}
            list={list}
            listActions={infoList.listActions}
            hrefButton="dashboard/leads/register"
            textButton={
              checkUserPermissions('lead.register', profile.role)
                ? 'Novo lead'
                : undefined
            }
            title="Leads"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
