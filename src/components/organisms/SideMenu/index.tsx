import { Button } from "@/components/atoms";
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
    <div className="fixed flex flex-row w-auto z-50">
      <div
        className={twMerge(
          "bg-primary-100",
          "w-0 h-svh",
          "flex flex-row items-start justify-start",
          "whitespace-nowrap overflow-scroll",
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
              roles={config.roles}
            />
          ))}
        </div>
      </div>
      <div
        onClick={() => setOpenMenu(false)}
        className={twMerge(
          "hidden w-[var(--width-nav-bar)] h-svh cursor-pointer bg-transparent justify-center items-center",
          openMenu && "md:hidden flex"
        )}
      />
    </div>
  );
};

export default SideMenu;
