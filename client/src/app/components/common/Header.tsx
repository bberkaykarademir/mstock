"use client";
import { Bell, CircleUser, Menu, Moon, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useAppDispatch } from "@/app/redux";
import { toggleDarkMode, toggleSidebar } from "@/app/store/slices/uiSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const getTitleFromUrl = () => {
    const url = usePathname();
    const titles: { [key: string]: string } = {
      "/": "Dashboard",
      "/dashboard": "Dashboard",
      "/inventory": "Inventory",
      "/demands": "Demands",
      "/sales": "Sales",
      "/staff": "Staff",
      "/company-assets": "Company Assets",
      "/settings": "Settings",
    };
    return titles[url] || "Page";
  };

  return (
    <header className="flex justify-between items-center my-10">
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-medium">{getTitleFromUrl()}</h1>
        <button
          className="rounded-full bg-gray-100 hover:bg-blue-100 p-2"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-6 h-full">
        <button
          onClick={() => {
            dispatch(toggleDarkMode());
          }}
        >
          <Moon />
        </button>
        <button>
          <Bell />
        </button>
        <div className="bg-gray-300 rounded-full h-full w-[3px]"></div>
        <div className="flex items-center gap-3">
          <CircleUser />
          <span className="font-bold">John Doe</span>
        </div>
        <Link href="/settings">
          <Settings />
        </Link>
      </div>
    </header>
  );
};

export default Header;
