import { mockServer } from "@/components/config/mockServer";
import { IndicatorType, Lead } from "@/types/general";

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

  return { getIndicatorForId, getLeadForId };
}
