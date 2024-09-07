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

const Sidebar = () => {
  const menuItems = [
    { href: "/", text: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/inventory", text: "Inventory", icon: <Blocks /> },
    { href: "/demands", text: "Demands", icon: <Handshake /> },
    { href: "/sales", text: "Sales", icon: <Banknote /> },
    { href: "/staff", text: "Staff", icon: <UserRound /> },
    { href: "/assets", text: "Company Assets", icon: <Building /> },
    { href: "/settings", text: "Settings", icon: <Settings /> },
  ];

  return (
    <aside className="bg-white sticky top-0 h-screen w-64 shadow pb-5 pt-10 flex flex-col gap-10">
      <div className="flex gap-4 items-center justify-center">
        <h1 className="text-2xl my-auto font-bold text-center">
          <span className="text-blue-500">m</span>
          <span>stock</span>
        </h1>
        {/* <button className="rounded-full bg-gray-200 mt-1 p-2">
          <Menu className="w-4 h-4" />
        </button> */}
      </div>
      <nav>
        <ul className="flex flex-col gap-4">
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <Link
                title={menuItem.text}
                href={menuItem.href}
                className="flex items-center gap-3 hover:bg-gray-100 p-4 rounded-md"
              >
                {menuItem.icon}

                <span>{menuItem.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <span className="mt-auto mx-auto">&copy; 2024 mstock</span>
    </aside>
  );
};

export default Sidebar;
