"use client";

import React, { ReactNode, useState } from "react";
import { Avatar } from "..";
import { Text } from "@/components/atoms";
import { ListActionsProps } from "@/types/general";
import DropDownDots from "../DropDownDots";

type ItemListProps = {
  listActions: Array<ListActionsProps>;
  avatar: ReactNode | number;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  info5: string;
};

const ItemList = ({
  listActions,
  avatar,
  info1,
  info2,
  info3,
  info4,
  info5,
}: ItemListProps) => {
  return (
    <div className="w-full relative rounded-full bg-gray-200 flex flex-row justify-start items-center p-3">
      <div className="w-[10%] md:w-[10%] sm:w-[20%] flex flex-row justify-start">
        <Avatar
          colorIcon="white"
          classIcon="bg-gray-300 border-transparent size-[60px]"
        >
          {avatar}
        </Avatar>
      </div>
      {(info1 || info2) && (
        <div className="ml-4 gap-2 w-full sm:text-start">
          <Text className="font-bold w-full text-center text-black">
            {info1}
          </Text>
          <Text className="w-full text-center">{info2}</Text>
        </div>
      )}
      {info3 && (
        <div className="ml-4 w-full hidden md:flex ">
          <Text className="text-black w-full text-center font-medium">
            {info3}
          </Text>
        </div>
      )}

      {info4 && (
        <div className="ml-4 w-full lg:flex hidden ">
          <Text className="text-black w-full text-center font-medium">
            {info4}
          </Text>
        </div>
      )}

      {info5 && (
        <div className="ml-4 w-full xl:flex hidden">
          <Text className="text-black w-full text-center font-medium">
            {info5}
          </Text>
        </div>
      )}

      <div className="ml-4 w-full hidden sm:flex flex-row justify-center gap-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
        {listActions.map((action) => (
          <Avatar
            href={action.href}
            icon={action.icon}
            key={action.id}
            size={35}
            classIcon="bg-secondary-50 border-transparent size-[35px]"
          />
        ))}
      </div>

      <div className="w-[20%] flex sm:hidden flex-row justify-end items-center">
        <DropDownDots listActions={listActions} />
      </div>
    </div>
  );
};

export default ItemList;
