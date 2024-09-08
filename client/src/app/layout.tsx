import type { Metadata } from "next";
import "./globals.css";

import StoreProviderComponent from "@/app/components/common/StoreProviderComponent";
import LayoutContentWrapper from "@/app/components/common/LayoutContentWrapper";

export const metadata: Metadata = {
  title: "mstock",
  description: "Manage your inventory with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProviderComponent>
          <LayoutContentWrapper>{children}</LayoutContentWrapper>
        </StoreProviderComponent>
      </body>
    </html>
  );
}
