import { updateUnit } from '@/actions/unit'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { api } from '@/data/api'
import { Course, Errors, ReturnLoadList, Segment, Unit } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { templates } from './templates'

async function loadCourses(): Promise<ReturnLoadList<Course>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/course/select`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const list = await response.json()
    return { response: list.courses }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

async function loadSegments(): Promise<ReturnLoadList<Segment>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/segment/select', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }

    const list = await response.json()
    return { response: list.segments }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

async function getUnitForId(id: string): Promise<{
  response?: Unit
  error?: Errors<Unit>
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

  const responseSegments = await loadSegments()
  templates.templateForm.sections[1].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[0].fields[0].option,
    list: responseSegments?.response ?? [],
    values: unit?.segments?.map((segment) => segment.segment.id),
  }
  const responseCourses = await loadCourses()
  templates.templateForm.sections[2].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[2].boxes[0].fields[0].option,
    list: responseCourses?.response ?? [],
    values: unit?.courses?.map((course) => course.course.id),
  }

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
        </div>
      </div>
    </ContainerDashboard>
  )
}
