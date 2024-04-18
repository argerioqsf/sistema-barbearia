import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { Course, InfoList, ReturnLoadList, SearchParams } from '@/types/general'
import React from 'react'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { api } from '@/data/api'

async function loadCourses(
  q?: string,
  page?: string,
): Promise<ReturnLoadList<Course>> {
  try {
    const queryQ = q && `q=${q}&`
    const queryPage = page && `page=${page}`
    const token = getTokenFromCookieServer()
    const response = await api(`/courses?${queryQ}${queryPage ?? ''}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['course'], revalidate: 60 },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const list = await response.json()
    return { response: list.courses.courses }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function ListCourses({ searchParams }: SearchParams) {
  const infoList: InfoList<Course> = {
    itemsHeader: ['N', 'NOME', 'ATIVO', '', ''],
    itemsList: ['name', '', 'active', '', ''],
  }

  const response = await loadCourses(
    searchParams?.q ?? '',
    searchParams?.page ?? '',
  )

  const list = response?.response ?? null
  const errorRequest = response.error?.request ?? null

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
            listActions={mockServer.listActionsCourses}
            hrefButton="dashboard/courses/register"
            textButton="Novo Curso"
            title="Cursos"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
