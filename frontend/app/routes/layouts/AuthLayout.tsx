import type { ReactNode } from "react";
import { Outlet } from "react-router";
import Logo from "~/routes/components/Logo";

export default function AuthLayout() {
  return (
    <div className="h-full w-full flex flex-col">
      <header className="w-full flex justify-start p-4">
        <div className="flex items-center gap-2">
          <Logo />
          <p className="font-medium">Pamflet</p>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
