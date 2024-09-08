"use client";
import React, { ReactNode } from "react";
import StoreProvider from "@/app/redux";

const StoreProviderComponent = ({ children }: { children: ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default StoreProviderComponent;
