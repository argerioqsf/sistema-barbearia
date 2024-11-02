import { listSelectSegments } from '@/actions/segments'
import { Course, Segment, TemplateForm, Unit } from '@/types/general'
import { useState } from 'react'

export default function useRegisterUnit(
  template: TemplateForm<Unit | Course | Segment>,
) {
  const [templateForm, setTemplateForm] =
    useState<TemplateForm<Unit | Course | Segment>>(template)

  function addCourse(segment?: Segment): Course[] {
    if (segment) {
      // Field de Cursos
      const courses = templateForm.sections[2].boxes[0].fields[0].option
        ?.list as Course[]
      const idsCourses = courses?.map((course) => course.id)
      const coursesSegment = segment?.courses
        ?.map((course) => course.course)
        .filter((course) => !idsCourses.includes(course.id))

      if (coursesSegment && courses) {
        return [...courses, ...coursesSegment]
      }

      return []
    }
    return []
  }
  // TODO: refatorar para selecionar um segmento por vez e seus cursos
  async function listSegment(unit?: Unit) {
    const resp = await listSelectSegments()
    if (resp.response) {
      const segments = resp.response
      let newCourses: Course[] = []

      if (unit && unit.segments) {
        for (let i = 0; i < unit.segments.length; i++) {
          const segment = unit.segments[i].segment
          const coursesSegments = addCourse(segment)
          newCourses = [...newCourses, ...coursesSegments]
        }
      }

      if (newCourses && newCourses.length > 0) {
        // Field de Cursos
        templateForm.sections[2].boxes[0].fields[0].option = {
          ...templateForm.sections[2].boxes[0].fields[0].option,
          list: [...newCourses],
        }
      }

      templateForm.sections[1].boxes[0].fields[0].option = {
        ...templateForm.sections[1].boxes[0].fields[0].option,
        list: segments,
        values: unit?.segments?.map((segment) => segment.segment.id),
        onChange: (id?: string) => {
          const segment = segments.find((segment) => segment.id === id)
          const newCoursesTemp = addCourse(segment)
          if (newCoursesTemp) {
            // Field de Cursos
            templateForm.sections[2].boxes[0].fields[0].option = {
              ...templateForm.sections[2].boxes[0].fields[0].option,
              list: [...newCoursesTemp],
            }
          }
          setTemplateForm({ ...templateForm })
        },
        onDelete: (id: string, formDataExtra: FormData) => {
          const coursesInit = JSON.parse(
            String(formDataExtra.get('courses')) ?? '[]',
          ) as string[]
          const segmentsInit = JSON.parse(
            String(formDataExtra.get('segments')) ?? '[]',
          ) as string[]
          const segment = segments.find((segment) => segment.id === id)
          if (segment) {
            let coursesSegment = segment?.courses?.map(
              (course) => course.course.id,
            )
            coursesSegment = coursesSegment?.filter((item) => {
              const verify = segmentsInit.filter((seg) => {
                if (seg !== segment.id) {
                  const coursesIdSegment = segments
                    .find((segment) => segment.id === seg)
                    ?.courses?.map((course) => course.course.id)
                  const exist = coursesIdSegment?.includes(item)
                  return exist
                } else {
                  return false
                }
              })
              return verify.length === 0
            })
            if (coursesSegment) {
              let courses = templateForm.sections[2].boxes[0].fields[0].option
                ?.list as Course[]
              if (courses) {
                courses = courses.filter(
                  (course) => !coursesSegment?.includes(course.id),
                )
                templateForm.sections[2].boxes[0].fields[0].option = {
                  ...templateForm.sections[2].boxes[0].fields[0].option,
                  list: [...courses],
                  values: [
                    ...coursesInit.filter(
                      (course) => !coursesSegment?.includes(course),
                    ),
                  ],
                }
                setTemplateForm({ ...templateForm })
              }
            }
          }
        },
      }

      if (unit?.courses && unit?.courses?.length > 0) {
        // Field de Cursos
        templateForm.sections[2].boxes[0].fields[0].option = {
          ...templateForm.sections[2].boxes[0].fields[0].option,
          values: unit?.courses?.map((course) => course.course.id),
        }
      } else {
        templateForm.sections[2].boxes[0].fields[0].option = {
          ...templateForm.sections[2].boxes[0].fields[0].option,
          // list: [],
          values: [],
        }
      }

      setTemplateForm({ ...templateForm })
    }
  }

  return { templateForm, listSegment }
}
