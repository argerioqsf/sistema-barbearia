import { MenuIcon } from "@/components/Icons/MenuIcon";
import { Button } from "@/components/atoms";
import Avatar from "@/components/molecules/Avatar";
import InfoUserNav from "@/components/molecules/InfoUserNav";
import React, { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type NavBarProps = {
  setOpenMenu: Dispatch<SetStateAction<any>>;
  openMenu: boolean | null;
};

const NavBar: React.FC<NavBarProps> = ({ setOpenMenu, openMenu }) => {
  function openCloseMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <nav
      className={twMerge(
        "flex max-w-full z-40 w-full h-auto items-center justify-center fixed top-0 bg-gray-300"
      )}
    >
      <header
        className={twMerge(
          "px-6 gap-4",
          "h-[var(--navbar-height)]",
          "z-40 flex  w-full flex-row relative flex-nowrap items-center justify-between"
        )}
      >
        <div className="w-full h-full flex flex-row items-center justify-between">
          <Button onClick={openCloseMenu} type="button">
            <MenuIcon size={30} />
          </Button>
          <div className={twMerge("flex flex-row gap-4")}>
            <Avatar
              classIcon={`size-${[50]}px`}
              href="profile"
              image="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              size={50}
            />
            <InfoUserNav
              className="hidden md:flex"
              nameUser="Argerio Q. Silva"
            />
          </div>
        </div>
      </header>
    </nav>
  );
};

export default NavBar;
