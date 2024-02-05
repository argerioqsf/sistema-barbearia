import { MenuIcon } from "@/components/Icons/MenuIcon";
import { Button, Text } from "@/components/atoms";
import LinkDefault from "@/components/atoms/LinkDefault";
import Avatar from "@/components/molecules/Avatar";
import Image from "next/image";
import Link from "next/link";
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
        "flex z-40 w-full h-auto items-center justify-center fixed top-0  bg-gray-200",
        openMenu === true && "animate-openMenuIcon",
        openMenu === false && "animate-closeMenuIcon"
      )}
    >
      <header className="z-40 flex  px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-[--max-width-page]">
        <div className="w-full h-full flex flex-row items-center justify-between">
          <Button onClick={openCloseMenu} type="button">
            <MenuIcon size={30} />
          </Button>
          <div className="flex flex-row gap-4">
            <Avatar
              image="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
              size={50}
            />

            {/* Info Navbar */}
            <div className="pt-1">
              <Text className="text-indigo-500">Argerio Q. Silva</Text>
              <LinkDefault
                className="text-base text-indigo-600 font-bold"
                href={"#"}
              >
                SAIR
              </LinkDefault>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default NavBar;
