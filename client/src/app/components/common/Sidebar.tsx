"use client";
import React from "react";
import Link from "next/link";
import {
  Menu,
  LayoutDashboard,
  Blocks,
  Handshake,
  Banknote,
  UserRound,
  Building,
  Settings,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { toggleSidebar } from "@/app/store/slices/uiSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.ui.isSidebarCollapsed
  );

  const menuItems = [
    { href: "/", text: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/inventory", text: "Inventory", icon: <Blocks /> },
    { href: "/demands", text: "Demands", icon: <Handshake /> },
    { href: "/sales", text: "Sales", icon: <Banknote /> },
    { href: "/staff", text: "Staff", icon: <UserRound /> },
    { href: "/company-assets", text: "Company Assets", icon: <Building /> },
    { href: "/settings", text: "Settings", icon: <Settings /> },
  ];

  return (
    <aside
      className={`bg-white fixed lg:sticky top-0 h-dvh overflow-hidden ${
        isSidebarCollapsed ? "w-0 lg:w-16" : "w-64"
      } flex-shrink-0 shadow pb-5 pt-10 flex flex-col gap-10 transition-all duration-300 z-10`}
    >
      <div className="flex gap-4 items-center justify-center">
        <h1 className="text-2xl my-auto font-bold text-center">
          <span className="text-blue-500 ">m</span>
          <span className={`${isSidebarCollapsed ? "hidden" : ""}`}>stock</span>
        </h1>
        <button
          className={`${
            isSidebarCollapsed ? "hidden" : "lg:hidden"
          } rounded-full bg-gray-100 hover:bg-blue-100 mt-1 p-2`}
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      <nav>
        <ul className="flex flex-col">
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <Link
                title={menuItem.text}
                href={menuItem.href}
                className="flex items-center gap-3 hover:bg-gray-100 p-4 rounded-md"
              >
                {menuItem.icon}

                <span className={` ${isSidebarCollapsed ? "hidden" : ""} `}>
                  {menuItem.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <span className={`${isSidebarCollapsed ? "hidden" : ""} mt-auto mx-auto`}>
        &copy; 2024 mstock
      </span>
    </aside>
  );
};

export default Sidebar;
