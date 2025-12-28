import type { ReactNode } from "react";
import NavDrawer from "../components/NavDrawer";
import { Outlet } from "react-router";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <NavDrawer />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  )
}
