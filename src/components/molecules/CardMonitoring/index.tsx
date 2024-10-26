import { Card } from '@/components/template/MonitoringIndicator'
import { handleIcons } from '@/utils/handleIcons'
import { twMerge } from 'tailwind-merge'

interface CardMonitoringProps {
  card: Card
  last: boolean
  classSubinfoValue?: string
  classSubinfoLabel?: string
  classSubinfo?: string
}

export function CardMonitoring({
  card,
  last,
  classSubinfoValue,
  classSubinfoLabel,
  classSubinfo,
}: CardMonitoringProps) {
  const Icon = handleIcons(card.icon)
  return (
    <div
      className={twMerge(
        'bg-stone-200 rounded-md min-w-[250px]',
        last ? 'col-span-1 md:col-span-2 lg:col-span-1' : 'col-span-1',
      )}
    >
      <div className="p-6 flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between">
          <span className="font-bold text-primary-100 text-3xl">
            {card.value}
          </span>
          <span className="text-stone-400">{card.label}</span>
        </div>
        <Icon size={30} />
      </div>
      <div
        className={twMerge(
          'p-4 bg-primary-100 rounded-b-md flex flex-row justify-between items-center text-white text-xs',
          classSubinfo,
        )}
      >
        {card.subinfo && (
          <>
            <span className={twMerge('text-base font-bold', classSubinfoLabel)}>
              {card.subinfo.label}
            </span>
            <span className={twMerge('text-2xl font-bold ', classSubinfoValue)}>
              {card.subinfo.value}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
