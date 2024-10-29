import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/user";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { authorizeMe } from "./auth/Auth";
import { queryKeys } from "@/constants/query-states";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const me = useQuery({
  //   // mutationKey: ["me"],
  //   // mutationFn: authorizeMe,
  //   queryKey: ["me"],
  //   queryFn: authorizeMe,
  // });
  const { data: me } = useQuery({
    queryKey: [queryKeys.me],
    queryFn: async () => await authorizeMe(),
  });

  const { setUser } = useUserStore();

  useEffect(() => {
    // me.mutateAsync().then((user) => {
    //   if (user) {
    //     setUser(user);
    //   }
    // });
    if (!me) return;
    setUser(me);
  }, [me, setUser]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
          {/* <pre>{JSON.stringify(me, null, 2)}</pre> */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
