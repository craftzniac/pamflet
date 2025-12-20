import { Outlet } from "react-router";
import GlobalProvider from "../contexts/GlobalProvider";

export default function RootLayout() {
  const user = { username: "john" };
  return (
    <GlobalProvider user={user}>
      <Outlet />
    </GlobalProvider>
  );
}
