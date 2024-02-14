"use client";

import { EditIcon } from "@/components/Icons/EditIcon";
import { EyeIcon } from "@/components/Icons/EyeIcon";
import { LockIcon } from "@/components/Icons/LockIcon";
import { Button, Text } from "@/components/atoms";
import { Avatar, HeaderList } from "@/components/molecules";
import ItemList from "@/components/molecules/ItemList";
import { useHandlerRouter } from "@/hooks/use-handler-router";
import {
  IndicatorType,
  ItemListType,
  ListActionsProps,
  UserType,
} from "@/types/general";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type ListingProps = {
  title: string;
  textButton: string;
  hrefButton: string;
  list: Array<ItemListType>;
  listActions: Array<ListActionsProps>;
  avatar: (item: ItemListType, index: number) => React.JSX.Element;
  itemsHeader: Array<string>;
};

const Listing = ({
  listActions,
  title,
  textButton,
  hrefButton,
  list,
  avatar,
  itemsHeader,
}: ListingProps) => {
  const { pushRouter } = useHandlerRouter();
  return (
    <div className="w-full">
      <div className="w-[90vw] lg:w-[95vw] flex flex-row justify-between items-center">
        <Text className="uppercase font-bold text-2xl lg:text-4xl text-black">
          {title}
        </Text>
        <Button
          onClick={() => pushRouter(hrefButton)}
          className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
          type="button"
        >
          {textButton}
        </Button>
      </div>
      <HeaderList itemsHeader={itemsHeader} />
      <div className="w-full mt-4 flex flex-col gap-4 pb-10">
        {list.map((item, index) => (
          <ItemList
            key={item.id}
            listActions={listActions}
            avatar={avatar(item, index)}
            info1={item.info1}
            info2={item.info2}
            info3={item.info3}
            info4={item.info4}
            info5={item.info5}
          />
        ))}
      </div>
    </div>
  );
};

export default Listing;
