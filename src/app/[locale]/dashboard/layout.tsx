"use client";

import "../global.css";
import NavBar from "@/components/organisms/NavBar";
import { Inter } from "next/font/google";
import SideMenu from "@/components/organisms/SideMenu";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <div className={twMerge("flex flex-col", inter.className)}>
      <SideMenu setOpenMenu={setOpenMenu} openMenu={openMenu} />
      <div className="flex flex-row justify-start">
        <div
          className={twMerge(
            "w-full pl-0",
            openMenu === true && "animate-openMenuChildren",
            openMenu === false && "animate-closeMenuChildren"
          )}
        >
          <NavBar setOpenMenu={setOpenMenu} openMenu={openMenu} />

          {children}
        </div>
      </div>
    </div>
  );
}
