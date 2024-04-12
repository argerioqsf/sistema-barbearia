import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Errors, Models, Unit } from '@/types/general'
import React from 'react'
import { templates } from './templates'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { api } from '@/data/api'
import { updateUnit } from '@/actions/unit'
import FormDashboard from '@/components/organisms/FormDashboard'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'

async function getUnitForId(id: string): Promise<{
  response?: Unit
  error?: Errors
}> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/unit/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 15,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const list = await response.json()
    return { response: list }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function DetailUnits({ id }: { id: string }) {
  const response = await getUnitForId(id)
  const unit = response?.response ?? null
  const errorRequest = response.error?.request ?? null
  const segments = unit?.segments?.map((segment) => {
    return {
      ...segment.segment,
    }
  })
  const courses = unit?.courses?.map((course) => {
    return {
      ...course.course,
    }
  })

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8 grid gap-8">
          <FormDashboard
            title={templates.templateForm.title}
            templateForm={templates.templateForm}
            defaultValues={unit ?? undefined}
            action={updateUnit}
            pathSuccess="/"
            schemaName={'UpdateUnit'}
          />
          <Search errorRequest={errorRequest} />
          <Listing
            infoList={templates.infoListSegments}
            list={segments as Models[]}
            listActions={templates.infoListSegments?.listActions}
            hrefButton={templates.infoListSegments?.hrefButton}
            textButton={templates.infoListSegments?.textButton}
            title={templates.infoListSegments?.title}
          />
          <Search errorRequest={errorRequest} />
          <Listing
            infoList={templates.infoListCourses}
            list={courses as Models[]}
            listActions={templates.infoListCourses?.listActions}
            hrefButton={templates.infoListCourses?.hrefButton}
            textButton={templates.infoListCourses?.textButton}
            title={templates.infoListCourses?.title}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
