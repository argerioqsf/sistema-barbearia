import { Avatar } from '@/components/molecules'
import { TimeLine } from '@/types/general'

type StatementComponentProps = {
  timeLine: TimeLine[]
}

const StatementComponent = ({ timeLine }: StatementComponentProps) => {
  return (
    <div className="w-[90vw] md:w-full">
      <div className="rounded-xl rounded-tl-none p-6 pl-0 relative">
        {timeLine?.map((item, idx) => (
          <div className="w-full mb-6 flex flex-row" key={idx}>
            <div className="flex flex-col justify-center items-center px-4">
              <Avatar size={20} classIcon="bg-green-700 z-20" icon="Check" />
              <div className="h-full w-1 absolute top-0 z-10 bg-gray-300" />
            </div>

            <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
              <div className="w-full flex flex-row justify-between items-center text-wrap">
                <h2 className="font-bold text-green-700">{item?.status}</h2>
                <h4 className="font-medium text-stone-500">
                  {item?.created_at}
                </h4>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex flex-row">
          <div className="flex flex-col justify-center items-center px-4">
            <Avatar size={20} classIcon="bg-gray-500 z-20" icon="Clock" />
            <div className="h-full w-1 bg-gray-300" />
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  )
}

export default StatementComponent
