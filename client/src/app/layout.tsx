import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/app/components/common/Sidebar";
import Header from "@/app/components/common/Header";

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
      <body className="light">
        <div className="flex gap-10">
          <Sidebar />
          <div className="flex flex-col px-10 flex-grow">
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
