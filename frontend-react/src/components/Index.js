import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import s from "./index.module.scss";

function Index() {
  const hasToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    hasToken ? navigate("/chat") : navigate("signin");
  }, [hasToken, navigate]);

  return (
    <div className={s.container}>
      <Outlet />
    </div>
  );
}

export default Index;
