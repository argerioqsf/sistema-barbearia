import { mockServer } from "@/components/config/mockServer";
import { IndicatorType, Lead, TimeLine } from "@/types/general";

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

  return { getIndicatorForId, getLeadForId, getTimelineForLeadId };
}
