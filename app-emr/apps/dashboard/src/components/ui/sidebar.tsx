import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Badge,
  ChevronDown,
  ChevronLeft,
  ClipboardPlus,
  HelpCircle,
  Home,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarItemProps, SidebarItemWithSubmenuProps } from "./types";

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => (
  <Button asChild variant={"ghost"} className="flex justify-start">
    <Link to={href}>
      {icon}
      {label}
    </Link>
  </Button>
);

const SidebarItemWithSubmenu: React.FC<SidebarItemWithSubmenuProps> = ({
  icon,
  label,
  href,
  submenuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-between items-center divide-x">
        <Button
          variant={"ghost"}
          asChild
          className="flex justify-start flex-grow rounded-r-none"
        >
          <Link to={href}>
            {icon}
            {label}
          </Link>
        </Button>
        <Button
          className="p-2 rounded-l-none"
          variant={"ghost"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </div>
      {isOpen && (
        <div className="pl-8">
          <div className="bg-gray-50 rounded">
            {submenuItems.map((item, key) => (
              <Button
                key={key}
                variant={"ghost"}
                asChild
                className="flex justify-start"
              >
                <Link to={item.href}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
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
      className={`bg-white w-64 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <span className="text-2xl font-semibold">Dashboard</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          <SidebarItem
            icon={<Home className="mr-3 h-5 w-5" />}
            label="Home"
            href=""
          />
          <SidebarItemWithSubmenu
            icon={<ClipboardPlus className="mr-3 h-5 w-5" />}
            label="Appointments"
            href="/appointments"
            submenuItems={[
              {
                label: "appointment",
                href: "/appointments/1",
                icon: <Badge className="mr-3 h-5 w-5" />,
              },
              {
                label: "prescription",
                href: "/appointments/1/prescriptions/1",
                icon: <Badge className="mr-3 h-5 w-5" />,
              },
            ]}
          />
          {/* <SidebarItemWithSubmenu
            icon={<Users className="mr-3 h-5 w-5" />}
            label="Users"
            href="/users"
            submenuItems={["List", "Add User", "Roles"]}
          /> */}
          <SidebarItem
            icon={<Settings className="mr-3 h-5 w-5" />}
            label="Settings"
            href="/settings"
          />
          <SidebarItem
            icon={<HelpCircle className="mr-3 h-5 w-5" />}
            label="Help"
            href="/help"
          />
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
