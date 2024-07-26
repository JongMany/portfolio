import MainHeader from "@/shared/ui/header/MainHeader";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  console.log("MainLayout");
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
