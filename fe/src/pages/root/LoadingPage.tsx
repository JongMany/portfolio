import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/main");
    }, 1000);
  }, [navigate]);

  return <div>로딩 중...</div>;
}
