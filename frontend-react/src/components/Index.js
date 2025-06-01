import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetAuthToken } from "../globleContext/AuthContext";
import s from "./index.module.scss";

function Index() {
  const { getToken } = useGetAuthToken();
  const hasToken = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    hasToken ? navigate("/chat") : navigate("signin");
  }, [hasToken]);

  return (
    <div className={s.container}>
      <Outlet />
    </div>
  );
}

export default Index;
