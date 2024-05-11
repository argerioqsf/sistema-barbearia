import { Card } from '@/components/template/MonitoringIndicator'
import { handleIcons } from '@/utils/handleIcons'

interface CardMonitoringProps {
  card: Card
}

export function CardMonitoring({ card }: CardMonitoringProps) {
  const Icon = handleIcons(card.icon)
  return (
    <div className="bg-stone-200 rounded-md min-w-[250px]">
      <div className="p-6 flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between">
          <span className="font-bold text-primary-100 text-3xl">
            {card.value}
          </span>
          <span className="text-stone-400">{card.label}</span>
        </div>
        <Icon size={30} />
      </div>
      <div className="p-4 bg-primary-100 rounded-b-md flex flex-row justify-between items-center text-white text-xs">
        <span>{card.subinfo.label}</span>
        <span>{card.subinfo.value}</span>
      </div>
    </div>
  )
}
