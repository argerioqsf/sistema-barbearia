"use client";

import React, { FC, ReactElement, useState } from "react";
import { Avatar } from "..";
import { Button, Link, Text } from "@/components/atoms";
import { ArrowRightIcon } from "@/components/Icons/ArrowRightIcon";
import { IconSvgProps } from "@/types/general";
import { twMerge } from "tailwind-merge";
import { ArrowDownIcon } from "@/components/Icons/ArrowDownIcon";
import { useRouter } from "next/navigation";

type ItemSideMenuProps = {
  onClick?: (state: any) => void;
  label: string;
  icon?: FC<IconSvgProps>;
  image?: string;
  subMenuList?: Array<{
    id: string;
    label: string;
    href: string;
    icon: FC<IconSvgProps>;
  }>;
  href?: string;
  sizeAvatar?: number;
  bgcolorAvatar?: string;
};

const ItemSideMenu: React.FC<ItemSideMenuProps> = ({
  label,
  icon,
  image,
  subMenuList,
  href = "",
  sizeAvatar = 30,
  bgcolorAvatar = "primary-100",
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function openSubMenu() {
    if (href) {
      return router.push(href);
    }
    setOpen(!open);
  }
  return (
    <div className="flex w-full flex-col min-h-[var(--navbar-height)] justify-start items-center border-b border-primary-50">
      <Button
        className="w-full rounded-none h-full flex flex-row justify-between items-center px-6 py-4"
        type="button"
        onClick={openSubMenu}
      >
        <div className="flex w-full flex-row justify-start items-center gap-4">
          <Avatar
            size={sizeAvatar}
            icon={icon && icon}
            image={image && image}
            bgColor={bgcolorAvatar}
          />
          <Text className="text-lg font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </Text>
        </div>

        {href.length > 0 ||
          (subMenuList &&
            (open ? (
              <ArrowRightIcon size={15} color="white" />
            ) : (
              <ArrowDownIcon size={20} color="white" />
            )))}
      </Button>

      {subMenuList && (
        <div
          className={twMerge(
            "w-full bg-primary-50 flex flex-col justify-between items-start  overflow-y-auto overflow-x-hidden whitespace-nowrap",
            open === false && "hidden",
            open === true && "flex"
          )}
        >
          {subMenuList.map((menu) => (
            <ItemSideMenu
              sizeAvatar={15}
              icon={menu.icon}
              href={menu.href}
              label={menu.label}
              key={menu.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemSideMenu;
