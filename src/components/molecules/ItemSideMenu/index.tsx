"use client";

import React, { FC, ReactElement, useState } from "react";
import { Avatar } from "..";
import { Button, Link, Text } from "@/components/atoms";
import { ArrowRightIcon } from "@/components/Icons/ArrowRightIcon";
import { IconSvgProps } from "@/types/general";
import { twMerge } from "tailwind-merge";
import { ArrowDownIcon } from "@/components/Icons/ArrowDownIcon";

type ItemSideMenuProps = {
  onClick?: (state: any) => void;
  label: string;
  icon?: ReactElement;
  image?: string;
  subMenuList?: Array<{ id: string; label: string }>;
  href?: string;
};

const ItemSideMenu: React.FC<ItemSideMenuProps> = ({
  onClick,
  label,
  icon,
  image,
  subMenuList,
  href = "",
}) => {
  const [open, setOpen] = useState(false);
  function openSubMenu() {
    if (href) {
      return;
    }
    setOpen(!open);
  }
  return (
    <div className="flex w-full flex-col justify-start items-center">
      <Link className="w-full" href={href}>
        <Button
          className="w-full rounded-none h-full flex flex-row justify-between items-center px-6 pb-4 border-b border-primary-50"
          type="button"
          onClick={openSubMenu}
        >
          <div className="flex w-full flex-row justify-start items-center gap-4">
            <Avatar size={30} icon={icon && icon} image={image && image} />
            <Text className="text-lg font-bold text-white">{label}</Text>
          </div>
          {onClick &&
            (open ? (
              <ArrowRightIcon size={15} color="white" />
            ) : (
              <ArrowDownIcon size={20} color="white" />
            ))}
        </Button>
        {subMenuList && (
          <div
            className={twMerge(
              "w-full bg-primary-50 flex flex-col pt-5 pb-3 justify-between items-start gap-4 overflow-y-auto overflow-x-hidden whitespace-nowrap",
              open === false && "hidden",
              open === true && "flex"
            )}
          >
            {subMenuList.map((menu) => (
              <ItemSideMenu label={menu.label} key={menu.id} />
            ))}
          </div>
        )}
      </Link>
    </div>
  );
};

export default ItemSideMenu;
