import MainHeader from "@/shared/ui/header/MainHeader";
import ModalProvider from "@/shared/ui/provider/ModalProvider";
import { Outlet, useLocation } from "react-router-dom";

export function MainLayout() {
  const location = useLocation();
  // Header의 높이만큼 Outlet을 내리기 위한 스타일
  const outletStyle = location.pathname !== "/" ? "pt-[8dvh]" : "";

  return (
    <ModalProvider>
      <MainHeader />
      <div className={outletStyle}>
        <Outlet />
      </div>
    </ModalProvider>
  );
}
