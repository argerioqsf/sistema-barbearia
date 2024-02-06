import { ArrowRightIcon } from "@/components/Icons/ArrowRightIcon";
import { UserIcon } from "@/components/Icons/UserIcon";
import { Button, Text } from "@/components/atoms";
import { siteConfig } from "@/components/config/siteConfig";
import { Avatar } from "@/components/molecules";
import ItemSideMenu from "@/components/molecules/ItemSideMenu";
import React from "react";
import { twMerge } from "tailwind-merge";

type SideMenuProps = {
  openMenu: boolean | null;
};

const SideMenu: React.FC<SideMenuProps> = ({ openMenu }) => {
  return (
    <div
      className={twMerge(
        "z-50 min-w-[var(--width-side-menu)] absolute translate-x-[calc(var(--width-side-menu)*-1)] h-screen bg-primary-100 flex flex-row items-start justify-start overflow-y-auto overflow-x-hidden whitespace-nowrap",
        openMenu === true && "animate-openMenu",
        openMenu === false && "animate-closeMenu"
      )}
    >
      <div className="w-full flex flex-col justify-between items-center">
        {siteConfig.items_side_menu.map((config) => (
          <ItemSideMenu
            image={config.image}
            sizeAvatar={config.size}
            icon={config.icon}
            subMenuList={config.subMenuList}
            key={config.id}
            label={config.label}
            href={config.href}
          />
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
