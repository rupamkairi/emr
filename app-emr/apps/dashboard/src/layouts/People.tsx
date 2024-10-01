import { Outlet } from "react-router-dom";

export default function PeopleLayout() {
  return (
    <div>
      <p>People Layout</p>
      <Outlet />
    </div>
  );
}
