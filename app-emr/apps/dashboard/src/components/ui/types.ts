import { ReactNode } from "react";

export interface SidebarItemProps {
  icon: ReactNode;
  title: string;
}

export interface SidebarItemWithSubmenuProps extends SidebarItemProps {
  submenuItems: string[];
}
