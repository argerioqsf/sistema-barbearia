import { deleteCourse, listCourses } from '@/actions/course'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'
import ErrorState from '@/components/molecules/ErrorState'

infoList.listActions = [
  {
    id: 1,
    icon: 'Trash',
    onclick: deleteCourse,
    name: 'Deletar',
    alert: {
      title: 'Você deseja realmente apagar este curso?',
      description:
        'Essa ação será irreversível, ele será apagado em todos os lugares do sistema',
    },
    toast: {
      title: 'Curso deletado com sucesso!',
    },
  },
  ...(infoList.listActions ?? []),
]

export default async function ListCourses({ searchParams }: SearchParams) {
  const response = await listCourses(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
  })

  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.message ?? null

  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar cursos"
        message={String(errorRequest)}
      />
    )
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4 mb-6">
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
            hrefButton="dashboard/courses/register"
            textButton="Novo Curso"
            title="Cursos"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
