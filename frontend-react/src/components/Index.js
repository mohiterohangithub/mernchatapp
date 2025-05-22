import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function Index() {
  const hasToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hasToken", hasToken);
    hasToken ? navigate("/chat") : navigate("/login");
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Index;
