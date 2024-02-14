import React from "react";
import { Avatar } from "..";
import { Text } from "@/components/atoms";

const HeaderList = ({ itemsHeader }: { itemsHeader: Array<string> }) => {
  return (
    <div className="w-[90vw] lg:w-[95vw] relative rounded-full bg-gray-400 flex flex-row justify-start items-center p-3 mt-8">
      <div className="w-[10%] md:w-[10%] sm:w-[20%] flex flex-row justify-start">
        <Avatar
          colorIcon="white"
          classIcon="bg-gray-300 border-transparent size-[60px]"
        >
          N
        </Avatar>
      </div>

      {/* {itemsHeader.map((item, index) => {})} */}

      {itemsHeader[0] && (
        <div className="ml-4 xl:w-[18%] lg:w-[22.5%] md:w-[30%] sm:w-[40%] w-[70%]">
          <Text className="w-full text-center font-bold text-white">
            <Text className="w-full text-center font-bold text-white">
              {itemsHeader[0]}
            </Text>
          </Text>
        </div>
      )}

      {itemsHeader[1] && (
        <div className="ml-4 xl:w-[18%] lg:w-[22.5%] md:w-[30%] md:flex hidden">
          <Text className="text-white w-full font-bold text-center">
            {itemsHeader[1]}
          </Text>
        </div>
      )}

      {itemsHeader[2] && (
        <div className="ml-4 xl:w-[18%] lg:w-[22.5%] lg:flex hidden">
          <Text className="text-white w-full font-bold text-center">
            {itemsHeader[2]}
          </Text>
        </div>
      )}

      {itemsHeader[3] && (
        <div className="ml-4 xl:w-[18%] xl:flex hidden">
          <Text className="text-white w-full font-bold text-center">
            {itemsHeader[3]}
          </Text>
        </div>
      )}

      {itemsHeader.length > 4 &&
        itemsHeader.map((item, index) => {
          if (index > 3) {
            return (
              <div key={item} className="ml-4 xl:w-[18%] xl:flex hidden">
                <Text className="text-white w-full font-bold text-center">
                  {item}
                </Text>
              </div>
            );
          }
        })}

      <div
        className={`ml-0 md:ml-4 hidden
        xl:w-[18%] md:w-[30%] lg:w-[22.5%] sm:w-[40%] 
        sm:flex flex-row justify-center items-center gap-2
        whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        <Text className="text-white w-full font-bold text-center">AÇÕES</Text>
      </div>
    </div>
  );
};

export default HeaderList;
