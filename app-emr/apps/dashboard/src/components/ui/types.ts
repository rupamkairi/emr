import { ReactNode } from "react";

export interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export interface SidebarItemWithSubmenuProps extends SidebarItemProps {
  submenuItems: SidebarItemProps[];
}
