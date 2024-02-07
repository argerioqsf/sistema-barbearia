import React, { ReactNode, useState } from "react";
import { Avatar } from "..";
import { Text } from "@/components/atoms";
import { IconSvgProps } from "@/types/general";
import DropDownDots from "../DropDownDots";

type ActionProps = {
  id: number;
  onclick?: () => void;
  icon: React.FC<IconSvgProps>;
  href?: string;
  name?: string;
};

type ItemListProps = {
  listActions: Array<ActionProps>;
  avatar: ReactNode | number;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
};

const ItemList = ({
  listActions,
  avatar,
  info1,
  info2,
  info3,
  info4,
}: ItemListProps) => {
  const listActionsDropDown = [
    {
      id: 1,
      href: "users/edit",
      name: "Editar",
    },
    {
      id: 2,
      href: "home",
      name: "Bloquear",
    },
    {
      id: 3,
      href: "home",
      name: "Vizualizar",
    },
  ];
  return (
    <div className="w-[90vw] lg:w-[95vw] relative rounded-full bg-gray-200 flex flex-row justify-start items-center p-3">
      <div className="w-[10%] sm:w-[20%] md:w-[10%] flex flex-row justify-start">
        <Avatar
          colorIcon="white"
          classIcon="bg-gray-300 border-transparent size-[60px]"
        >
          {avatar}
        </Avatar>
      </div>

      <div className="gap-2 text-center sm:text-start ml-4 w-[70%] sm:w-[40%] md:w-[30%] lg:w-[25%]">
        <Text className="font-bold text-black">{info1}</Text>
        <Text>{info2}</Text>
      </div>

      <div className="ml-4 hidden md:flex  md:w-[30%] lg:w-[25%]">
        <Text className="text-black font-medium">{info3}</Text>
      </div>

      <div className="ml-4 lg:w-[25%] hidden lg:flex">
        <Text className="text-black font-medium">{info4}</Text>
      </div>

      <div className="ml-4 hidden sm:w-[40%] md:w-[30%] lg:w-[15%] sm:flex flex-row justify-between items-center whitespace-nowrap overflow-hidden text-ellipsis">
        {listActions.map((action) => (
          <Avatar
            icon={action.icon}
            key={action.id}
            // bgColorIcon="secondary-50"
            size={40}
            // bdColor="transparent"
            classIcon="bg-secondary-50 border-transparent size-[40px]"
          />
        ))}
      </div>

      <div className="w-[20%] flex sm:hidden flex-row justify-end items-center">
        <DropDownDots listActions={listActionsDropDown} />
      </div>
    </div>
  );
};

export default ItemList;
