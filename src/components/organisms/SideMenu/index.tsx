import React from "react";
import { twMerge } from "tailwind-merge";

type SideMenuProps = {
  openMenu: boolean | null;
};

const SideMenu: React.FC<SideMenuProps> = ({ openMenu }) => {
  return (
    <div
      className={twMerge(
        "z-50 min-w-[var(--width-side-menu)] translate-x-[calc(var(--width-side-menu)*-1)] h-screen bg-primary-100 flex flex-row items-start justify-start overflow-y-auto overflow-x-hidden whitespace-nowrap",
        openMenu === true && "animate-openMenu",
        openMenu === false && "animate-closeMenu"
      )}
    >
      <div className="w-full p-4 flex flex-col justify-between items-center gap-4"></div>
    </div>
  );
};

export default SideMenu;
