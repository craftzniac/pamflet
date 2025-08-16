import { Outlet } from "react-router";
import Header from "../components/Header";
import GlobalProvider from "../contexts/GlobalProvider";

export default function RootLayout() {
  const user = { username: "john" };
  return (
    <GlobalProvider user={user}>
      <div className="flex flex-col w-full h-full">
        <Header  />
        <main className="w-full h-full flex flex-col min-h-0">
          <Outlet />
        </main>
      </div>
    </GlobalProvider>
  );
}
