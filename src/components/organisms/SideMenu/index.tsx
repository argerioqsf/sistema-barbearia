import { siteConfig } from "@/components/config/siteConfig";
import ItemSideMenu from "@/components/molecules/ItemSideMenu";
import React, { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type SideMenuProps = {
  openMenu: boolean | null;
  setOpenMenu: Dispatch<SetStateAction<any>>;
};

const SideMenu: React.FC<SideMenuProps> = ({ openMenu, setOpenMenu }) => {
  return (
    <div
      className={twMerge(
        "bg-primary-100",
        "w-0 h-screen",
        "flex fixed flex-row items-start justify-start",
        "z-50 overflow-x-hidden whitespace-nowrap",
        openMenu === true && "animate-openMenu",
        openMenu === false && "animate-closeMenu"
      )}
    >
      <div className="w-full flex flex-col justify-between items-center">
        {siteConfig.items_side_menu.map((config) => (
          <ItemSideMenu
            setOpenMenu={setOpenMenu}
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
