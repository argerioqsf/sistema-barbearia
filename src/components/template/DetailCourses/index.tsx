import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Course, Errors } from '@/types/general'
import React from 'react'
import * as templates from './templates'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { api } from '@/data/api'
import FormDashboard from '@/components/organisms/FormDashboard'
import { updateCourse } from '@/actions/course'

async function getCourseForId(id: string): Promise<{
  response?: Course
  error?: Errors
}> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/user/${id}`, {
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
    const { course } = await response.json()
    return { response: course }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function DetailCourses({ id }: { id: string }) {
  const response = await getCourseForId(id)
  const course = response.response
  const errorRequest = response.error?.request ?? undefined

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={course ?? undefined}
          action={updateCourse}
          pathSuccess="/"
          schemaName={'UpdateUnit'}
          errorRequest={errorRequest}
        />
      </div>
    </ContainerDashboard>
  )
}
