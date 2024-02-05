import { MenuIcon } from "@/components/Icons/MenuIcon";
import { Button } from "@/components/atoms";
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
        "flex z-40 w-full h-auto items-center justify-center fixed top-0  bg-gray-200 transition-all ease-out duration-1000",
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
            {/* Avatar */}
            <div className="w-[50px] h-[50px] bg-primary-100 rounded-full flex flex-row items-center justify-center border-2 border-primary-100">
              <Link href={"#"}>
                <Image
                  className="align-middle rounded-full m-0 p-0 aspect-square"
                  src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                />
              </Link>
            </div>

            {/* Info Navbar */}
            <div className="pt-1">
              <h2 className="text-sm text-indigo-500">Argerio Q. Silva</h2>
              <Link className="text-base text-indigo-600" href={"#"}>
                SAIR
              </Link>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default NavBar;
