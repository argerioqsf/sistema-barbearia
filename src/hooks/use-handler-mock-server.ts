import { mockServer } from "@/components/config/mockServer";
import { IndicatorType } from "@/types/general";

export function useHandlerMockServer() {
  function getIndicatorForId(id: number | string): IndicatorType[] {
    const indicators = mockServer.indicators;
    return indicators.filter((indicator) => {
      return indicator.id == id;
    });
  }

  return { getIndicatorForId };
}
