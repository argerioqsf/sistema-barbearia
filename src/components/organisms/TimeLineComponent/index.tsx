import { Text } from "@/components/atoms";
import { Avatar } from "@/components/molecules";
import { TimeLine } from "@/types/general";
import React from "react";
import { useFormatter } from "next-intl";

type TimeLineComponentProps = {
  timeLine: TimeLine[];
};

const TimeLineComponent = ({ timeLine }: TimeLineComponentProps) => {
  const format = useFormatter();

  return (
    <div className="w-[90vw] md:w-full">
      <div className="p-4 pb-2 bg-gray-200 rounded-xl rounded-b-none w-56 shadow-md shadow-slate-400">
        <Text className="text-black font-normal text-sm text-center uppercase whitespace-nowrap overflow-hidden text-ellipsis">
          Linha do Tempo
        </Text>
      </div>
      <div className="bg-gray-200 rounded-xl rounded-tl-none p-6 pl-0 shadow-md shadow-slate-400">
        {timeLine?.map((item, idx) => (
          <div className="w-full flex flex-row" key={idx}>
            <div className="flex flex-col justify-center items-center px-4">
              <Avatar size={20} classIcon="bg-blue-500" icon="Circle" />
              <div className="h-full w-1 bg-gray-300" />
            </div>
            <div className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white">
              <div className="w-full flex flex-row justify-between items-center border-b border-gray-300 pb-2 text-wrap">
                <h2>{item?.status}</h2>
                <h4>{format.relativeTime(new Date(item.createdAt))}</h4>
              </div>
              <div className="pt-2 text-wrap">
                <Text>{item.description}</Text>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex flex-row">
          <div className="flex flex-col justify-center items-center px-4">
            <Avatar size={20} classIcon="bg-gray-500" icon="Clock" />
            <div className="h-full w-1 bg-gray-300" />
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineComponent;
