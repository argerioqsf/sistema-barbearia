import { ArrowRightIcon } from "@/components/Icons/ArrowRightIcon";
import { UserIcon } from "@/components/Icons/UserIcon";
import { Button, Text } from "@/components/atoms";
import { Avatar } from "@/components/molecules";
import ItemSideMenu from "@/components/molecules/ItemSideMenu";
import React from "react";
import { twMerge } from "tailwind-merge";

type SideMenuProps = {
  openMenu: boolean | null;
};

const SideMenu: React.FC<SideMenuProps> = ({ openMenu }) => {
  function openSubmenu(id: string) {}
  const subMenuList = [
    {
      id: "1",
      label: "NOME do MENU",
    },
    {
      id: "2",
      label: "NOME do MENU",
    },
    {
      id: "3",
      label: "NOME do MENU",
    },
  ];
  return (
    <div
      className={twMerge(
        "z-50 min-w-[var(--width-side-menu)] translate-x-[calc(var(--width-side-menu)*-1)] h-screen bg-primary-100 flex flex-row items-start justify-start overflow-y-auto overflow-x-hidden whitespace-nowrap",
        openMenu === true && "animate-openMenu",
        openMenu === false && "animate-closeMenu"
      )}
    >
      <div className="w-full pt-6 flex flex-col justify-between items-center gap-4">
        <ItemSideMenu
          href="home"
          label="SIM"
          image="https://www.grupomadretereza.com.br/sim/themes/simadm/assets/images/logo.png"
        />

        <ItemSideMenu label="ARGÉRIO FILHO" href="profile" />

        <ItemSideMenu
          subMenuList={subMenuList}
          label="NOME MENU"
          onClick={openSubmenu}
        />
        <ItemSideMenu
          subMenuList={subMenuList}
          label="NOME MENU"
          onClick={openSubmenu}
        />
        <ItemSideMenu
          subMenuList={subMenuList}
          label="NOME MENU"
          onClick={openSubmenu}
        />
      </div>
    </div>
  );
};

export default SideMenu;
