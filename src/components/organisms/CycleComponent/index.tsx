import { Text } from '@/components/atoms'
import { Avatar } from '@/components/molecules'
import { Cyclo } from '@/types/general'
import { useFormatter } from 'next-intl'

type CycleComponentProps = {
  cyclos: Cyclo[]
}

const CycleComponent = ({ cyclos }: CycleComponentProps) => {
  const format = useFormatter()

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-xl rounded-tl-none">
        {cyclos?.map((item, idx) => (
          <div className="w-full flex flex-row" key={idx}>
            <div className="flex flex-col justify-center items-center px-2">
              <Avatar size={20} classIcon="bg-blue-500" icon="Circle" />
              <div className="h-full w-1 bg-gray-300" />
            </div>
            <div className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white">
              <div className="w-full flex flex-row justify-between items-center border-b border-gray-300 pb-2 text-wrap">
                <h2>{item?.status}</h2>
                <h4 className="text-lime-800">
                  {`incio ${format.dateTime(new Date(item.start_cycle), {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}`}
                </h4>
              </div>
              <div className="pt-2 w-full flex flex-row justify-between items-center text-wrap">
                <Text>{item.description}</Text>
                {item.end_cycle ? (
                  <h4 className="text-red-700">
                    {`fim ${format.dateTime(new Date(item.end_cycle), {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}`}
                  </h4>
                ) : (
                  <span className="text-cyan-600">Ciclo aberto</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex flex-row">
          <div className="flex flex-col justify-center items-center px-2">
            <Avatar size={20} classIcon="bg-gray-500" icon="Clock" />
            <div className="h-full w-1 bg-gray-300" />
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  )
}

export default CycleComponent
