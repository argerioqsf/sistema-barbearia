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
  console.log("openMenu: ", openMenu);
  return (
    <html lang={locale}>
      <body>
        <div className={twMerge("flex flex-col", inter.className)}>
          <NavBar setOpenMenu={setOpenMenu} openMenu={openMenu} />
          <div className="flex flex-row">
            <SideMenu openMenu={openMenu} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
