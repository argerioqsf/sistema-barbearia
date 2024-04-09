import React from 'react'
import { Avatar } from '..'
import { Text } from '@/components/atoms'

const HeaderList = ({ itemsHeader }: { itemsHeader: Array<string> }) => {
  return (
    <div className="w-full relative rounded-full bg-gray-400 flex flex-row justify-start items-center p-3 mt-8">
      <div className="w-[10%] md:w-[10%] sm:w-[20%] flex flex-row justify-start">
        <Avatar
          colorIcon="white"
          classIcon="bg-gray-300 border-transparent size-[60px]"
        >
          {itemsHeader[0]}
        </Avatar>
      </div>

      {itemsHeader[1] && (
        <div className="ml-4 w-full">
          <Text className="w-full text-center font-bold text-white">
            {itemsHeader[1]}
          </Text>
        </div>
      )}

      {itemsHeader[2] && (
        <div className="ml-4 w-full md:flex hidden">
          <Text className="text-white w-full font-bold text-center">
            {itemsHeader[2]}
          </Text>
        </div>
      )}

      {itemsHeader[3] && (
        <div className="ml-4 w-full lg:flex hidden">
          <Text className="text-white w-full font-bold text-center">
            {itemsHeader[3]}
          </Text>
        </div>
      )}

      {itemsHeader[4] && (
        <div className="ml-4 w-full xl:flex hidden">
          <Text className="text-white w-full font-bold text-center">
            {itemsHeader[4]}
          </Text>
        </div>
      )}

      {itemsHeader.length > 5 &&
        itemsHeader.map((item, index) => {
          if (index > 4) {
            return (
              <div key={item} className="ml-4 w-full xl:flex hidden">
                <Text className="text-white w-full font-bold text-center">
                  {item}
                </Text>
              </div>
            )
          } else {
            return null
          }
        })}

      <div
        className={`ml-4 md:ml-4 hidden
        w-full 
        sm:flex flex-row justify-center items-center gap-2
        whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        <Text className="text-white w-full font-bold text-center">AÇÕES</Text>
      </div>
      <div className="w-[20%] flex sm:hidden flex-row justify-end items-center" />
    </div>
  )
}

export default HeaderList
