'use client'

import React from 'react'
import { Avatar } from '..'
import { Text } from '@/components/atoms'
import { ItemListType, ListActionsProps } from '@/types/general'
import DropDownDots from '../DropDownDots'
import IconAction from '../IconAction'

type ItemListProps = {
  listActions: Array<ListActionsProps>
  idx?: number
  item: ItemListType
  id: string
}

const ItemList = ({ listActions, idx, item, id }: ItemListProps) => {
  return (
    <div className="w-full relative rounded-full bg-gray-200 flex flex-row justify-start items-center p-3">
      <div className="w-[10%] md:w-[10%] sm:w-[20%] flex flex-row justify-start">
        <Avatar
          colorIcon="white"
          classIcon="bg-gray-300 border-transparent size-[60px]"
        >
          {idx ?? ''}
        </Avatar>
      </div>
      {(item.info1 || item.info2) && (
        <div className="ml-4 gap-2 w-full sm:text-start">
          <Text className="font-bold w-full text-center text-black">
            {item.info1}
          </Text>
          <Text className="w-full text-center">{item.info2}</Text>
        </div>
      )}
      {item.info3 && (
        <div className="ml-4 w-full hidden md:flex ">
          <Text className="text-black w-full text-center font-medium">
            {item.info3}
          </Text>
        </div>
      )}

      {item.info4 && (
        <div className="ml-4 w-full lg:flex hidden ">
          <Text className="text-black w-full text-center font-medium">
            {item.info4}
          </Text>
        </div>
      )}

      {item.info5 && (
        <div className="ml-4 w-full xl:flex hidden">
          <Text className="text-black w-full text-center font-medium">
            {item.info5}
          </Text>
        </div>
      )}

      <div className="ml-4 w-full hidden sm:flex flex-row justify-center gap-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
        {listActions.map((action) => (
          <IconAction
            href={`${action.href}${id}`}
            icon={action.icon}
            key={action.id}
            size={35}
            classIcon="bg-secondary-50 border-transparent size-[35px]"
          />
        ))}
      </div>

      <div className="w-[20%] flex sm:hidden flex-row justify-end items-center">
        <DropDownDots listActions={listActions} id={id} />
      </div>
    </div>
  )
}

export default ItemList
