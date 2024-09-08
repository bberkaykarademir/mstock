"use client";

import React from "react";
import Sidebar from "@/app/components/common/Sidebar";
import Header from "@/app/components/common/Header";
import { useAppSelector } from "@/app/redux";

const LayoutContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex gap-10 bg-gray-50 text-gray-900`}
    >
      <Sidebar />
      <div className="flex flex-col px-10 flex-grow">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default LayoutContentWrapper;
