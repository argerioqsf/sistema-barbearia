"use client";

import { EditIcon } from "@/components/Icons/EditIcon";
import { EyeIcon } from "@/components/Icons/EyeIcon";
import { LockIcon } from "@/components/Icons/LockIcon";
import { Button, Text } from "@/components/atoms";
import ItemList from "@/components/molecules/ItemList";
import { useHandlerRouter } from "@/hooks/use-handler-router";
import { ItemListType, ListActionsProps } from "@/types/general";
import { useRouter } from "next/navigation";
import React from "react";

type ListingProps = {
  title: string;
  textButton: string;
  hrefButton: string;
  list: Array<ItemListType>;
  listActions: Array<ListActionsProps>;
};

const Listing = ({
  listActions,
  title,
  textButton,
  hrefButton,
  list,
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

      <div className="w-full mt-10 flex flex-col gap-4 pb-10">
        {list.map((item, index) => (
          <ItemList
            key={item.id}
            listActions={listActions}
            avatar={<Text className="text-black">{index + 1}</Text>}
            info1={item.info1}
            info2={item.info2}
            info3={item.info3}
            info4={item.info4}
          />
        ))}
      </div>
    </div>
  );
};

export default Listing;
