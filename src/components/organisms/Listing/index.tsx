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
import { twJoin, twMerge } from "tailwind-merge";

type ListingProps = {
  title: string;
  textButton: string;
  hrefButton: string;
  list: Array<ItemListType>;
  listActions: Array<ListActionsProps>;
  avatar: (item: ItemListType, index: number) => React.JSX.Element;
  itemsHeader: Array<string>;
  variant?: "default" | "segmented";
};

const Listing = ({
  listActions,
  title,
  textButton,
  hrefButton,
  list,
  avatar,
  itemsHeader,
  variant = "default",
}: ListingProps) => {
  const { pushRouter } = useHandlerRouter();
  return (
    <div
      className={twJoin(
        "w-[90vw] md:w-full flex flex-col justify-center items-center",
        variant === "segmented" && "p-[1vw] rounded-xl bg-gray-500"
      )}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <Text
          className={twMerge(
            `uppercase font-bold text-2xl lg:text-4xl ${
              variant == "default" ? "text-black" : "text-white"
            } whitespace-nowrap overflow-hidden text-ellipsis`
          )}
        >
          {title}
        </Text>
        {textButton && (
          <Button
            onClick={() => pushRouter(hrefButton)}
            className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
            type="button"
          >
            {textButton}
          </Button>
        )}
      </div>
      {itemsHeader.length > 0 && (
        <div
          className={twMerge(
            variant === "segmented"
              ? "w-[88vw] md:w-full"
              : "w-[90vw] md:w-full"
          )}
        >
          <HeaderList itemsHeader={itemsHeader} />
        </div>
      )}
      {list.length > 0 && (
        <div
          className={twMerge(
            "w-full mt-4 flex flex-col gap-4 pb-4 justify-start items-center",
            variant === "segmented" && "w-[88vw] lg:w-[93vw]"
          )}
        >
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
      )}
    </div>
  );
};

export default Listing;
