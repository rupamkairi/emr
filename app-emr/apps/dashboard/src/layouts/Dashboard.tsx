import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { authorizeMe } from "./auth/Auth";
import { useUserStore } from "@/stores/user";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const me = useMutation({
    mutationKey: ["me"],
    mutationFn: authorizeMe,
  });

  const { setUser } = useUserStore();

  useEffect(() => {
    me.mutateAsync().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
