import { Outlet } from "@remix-run/react";

export default function Component() {
  return (
    <div>
      Prescriptions Layout
      <Outlet />
    </div>
  );
}
