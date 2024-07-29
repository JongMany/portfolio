import MainHeader from "@/shared/ui/header/MainHeader";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
