import { mockServer } from "@/components/config/mockServer";
import {
  Course,
  IndicatorType,
  Lead,
  Segment,
  TimeLine,
  Unit,
  UserType,
} from "@/types/general";

export function useHandlerMockServer() {
  function getIndicatorForId(id: number | string): IndicatorType[] {
    const indicators = mockServer.indicators;
    return indicators.filter((indicator) => {
      return indicator.id == id;
    });
  }

  function getLeadForId(id: number | string): Lead[] {
    const indicators = mockServer.leads;
    return indicators.filter((lead) => {
      return lead.id == id;
    });
  }

  function getTimelineForLeadId(lead_id: number | string): TimeLine[] {
    const indicators = mockServer.time_line;
    return indicators.filter((time_line) => {
      return time_line.lead_id == lead_id;
    });
  }

  function getUserForId(id: number | string): UserType[] {
    const users = mockServer.users;
    return users.filter((user) => {
      return user.id == id;
    });
  }

  function getUnitForId(id: number | string): Unit[] {
    const units = mockServer.unidades;
    return units.filter((unit) => {
      return unit.id == id;
    });
  }

  function getSegmentForId(id: number | string): Segment[] {
    const segments = mockServer.segments;
    return segments.filter((segment) => {
      return segment.id == id;
    });
  }

  function getCourseForId(id: number | string): Course[] {
    const courses = mockServer.cursos;
    return courses.filter((course) => {
      return course.id == id;
    });
  }

  return {
    getIndicatorForId,
    getLeadForId,
    getTimelineForLeadId,
    getUserForId,
    getUnitForId,
    getSegmentForId,
    getCourseForId,
  };
}
