import { mockServer } from '@/components/config/mockServer'
import { Course, Lead, Segment, TimeLine, Unit, User } from '@/types/general'

export function useHandlerMockServer() {
  function getIndicatorForId(id: number | string): User[] {
    const indicators = mockServer.indicators
    return indicators.filter((indicator) => {
      return indicator.id === id
    })
  }

  function getLeadForId(id: number | string): Lead[] {
    const indicators = mockServer.leads
    return indicators.filter((lead) => {
      return lead.id === id
    })
  }

  function getTimelineForLeadId(leadId: string): TimeLine[] {
    const indicators = mockServer.time_line
    return indicators.filter((timeLine) => {
      return timeLine.leadsId === leadId
    })
  }

  function getUserForId(id: number | string): User[] {
    const users = mockServer.users
    return users.filter((user) => {
      return user.id === id
    })
  }

  function getUnitForId(id: number | string): Unit[] {
    const units = mockServer.unidades
    return units.filter((unit) => {
      return unit.id === id
    })
  }

  function getSegmentForId(id: number | string): Segment[] {
    const segments = mockServer.segments
    return segments.filter((segment) => {
      return segment.id === id
    })
  }

  function getCourseForId(id: number | string): Course[] {
    const courses = mockServer.cursos
    return courses.filter((course) => {
      return course.id === id
    })
  }

  return {
    getIndicatorForId,
    getLeadForId,
    getTimelineForLeadId,
    getUserForId,
    getUnitForId,
    getSegmentForId,
    getCourseForId,
  }
}
