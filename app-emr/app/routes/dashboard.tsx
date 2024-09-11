import { Outlet } from "@remix-run/react";
import Header from "~/components/ui/header";
import Sidebar from "~/components/ui/sidebar";

export default function Component() {
  return (
    <div>
      <div className="flex">
        <Sidebar className="w-64 h-screen" />
        <main className="flex-1">
          <Header />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
