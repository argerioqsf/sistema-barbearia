"use client";

import "../global.css";
import NavBar from "@/components/organisms/NavBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideMenu from "@/components/organisms/SideMenu";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function DashBoardLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <html lang={locale}>
      <body>
        <div className={twMerge("flex flex-col", inter.className)}>
          <NavBar setOpenMenu={setOpenMenu} openMenu={openMenu} />
          <div className="flex flex-row justify-start">
            <SideMenu openMenu={openMenu} />
            <div
              className={twMerge(
                "w-full pl-0",
                openMenu === true && "animate-openMenuChildren",
                openMenu === false && "animate-closeMenuChildren"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
