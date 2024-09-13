import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  ChevronDown,
  HelpCircle,
  Home,
  Settings,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { SidebarItemProps, SidebarItemWithSubmenuProps } from "./types";

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title }) => (
  <a
    href="#"
    className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
  >
    {icon}
    {title}
  </a>
);

const SidebarItemWithSubmenu: React.FC<SidebarItemWithSubmenuProps> = ({
  icon,
  title,
  submenuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
      >
        <div className="flex items-center">
          {icon}
          {title}
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="pl-4 mt-2 space-y-1">
          {submenuItems.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`bg-gray-800 text-white w-64 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <span className="text-2xl font-semibold">Dashboard</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          <SidebarItem icon={<Home className="mr-3 h-5 w-5" />} title="Home" />
          <SidebarItemWithSubmenu
            icon={<BarChart className="mr-3 h-5 w-5" />}
            title="Analytics"
            submenuItems={["Overview", "Reports", "Realtime"]}
          />
          <SidebarItemWithSubmenu
            icon={<Users className="mr-3 h-5 w-5" />}
            title="Users"
            submenuItems={["List", "Add User", "Roles"]}
          />
          <SidebarItem
            icon={<Settings className="mr-3 h-5 w-5" />}
            title="Settings"
          />
          <SidebarItem
            icon={<HelpCircle className="mr-3 h-5 w-5" />}
            title="Help"
          />
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
