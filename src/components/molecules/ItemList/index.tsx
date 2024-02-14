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
    <div className="w-[90vw] lg:w-[95vw] relative rounded-full bg-gray-200 flex flex-row justify-start items-center p-3">
      <div className="w-[10%] md:w-[10%] sm:w-[20%] flex flex-row justify-start">
        <Avatar
          colorIcon="white"
          classIcon="bg-gray-300 border-transparent size-[60px]"
        >
          {avatar}
        </Avatar>
      </div>

      <div className="gap-2 lg:w-[22.5%] xl:w-[18%] sm:text-start ml-4 w-[70%] sm:w-[40%] md:w-[30%]">
        <Text className="font-bold w-full text-center text-black">{info1}</Text>
        <Text className="w-full text-center">{info2}</Text>
      </div>

      <div className="ml-4 lg:w-[22.5%] xl:w-[18%] hidden md:flex md:w-[30%]">
        <Text className="text-black w-full text-center font-medium">
          {info3}
        </Text>
      </div>

      <div className="ml-4 lg:w-[22.5%] xl:w-[18%] lg:flex hidden ">
        <Text className="text-black w-full text-center font-medium">
          {info4}
        </Text>
      </div>

      <div className="ml-4 xl:w-[18%] xl:flex hidden">
        <Text className="text-black w-full text-center font-medium">
          {info5}
        </Text>
      </div>

      <div className="ml-4 lg:w-[22.5%] xl:w-[18%] hidden sm:w-[40%] md:w-[30%] sm:flex flex-row justify-end gap-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
        {listActions.map((action) => (
          <Avatar
            href={action.href}
            icon={action.icon}
            key={action.id}
            size={40}
            classIcon="bg-secondary-50 border-transparent size-[40px]"
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
