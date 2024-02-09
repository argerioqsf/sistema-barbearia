"use client";

import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Avatar } from "..";
import { Button, Text } from "@/components/atoms";
import { ArrowRightIcon } from "@/components/Icons/ArrowRightIcon";
import { IconSvgProps } from "@/types/general";
import { twMerge } from "tailwind-merge";
import { ArrowDownIcon } from "@/components/Icons/ArrowDownIcon";
import { usePathname, useRouter } from "next/navigation";

type ItemSideMenuProps = {
  onClick?: (state: any) => void;
  label: string;
  icon?: string;
  image?: string;
  subMenuList?: Array<{
    id: string;
    label: string;
    href: string;
    icon: string;
  }>;
  href?: string;
  sizeAvatar?: number;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
};

const ItemSideMenu: React.FC<ItemSideMenuProps> = ({
  label,
  icon,
  image,
  subMenuList,
  href = "",
  sizeAvatar = 32,
  setOpenMenu,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  function openSubMenu() {
    if (href) {
      setOpenMenu(false);
      return router.push(`/${pathNames[0]}/${href}`);
    }
    setOpen(!open);
  }

  return (
    <div className="flex w-full flex-col min-h-[var(--navbar-height)] justify-start items-center border-b border-primary-50">
      <Button
        className="w-full rounded-none h-full flex flex-row justify-start items-center px-4 py-4"
        type="button"
        onClick={openSubMenu}
      >
        <div className="w-[80%] flex flex-row justify-start items-center gap-4">
          <Avatar
            classIcon={`border-transparent size-[${sizeAvatar}px]`}
            size={sizeAvatar}
            icon={icon && icon}
            image={image && image}
          />
          <Text className="text-lg font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </Text>
        </div>

        <div className="w-[20%] flex flex-row justify-end pr-1">
          {href.length > 0 ||
            (subMenuList &&
              (open ? (
                <ArrowRightIcon size={15} color="white" />
              ) : (
                <ArrowDownIcon size={20} color="white" />
              )))}
        </div>
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
              setOpenMenu={setOpenMenu}
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
