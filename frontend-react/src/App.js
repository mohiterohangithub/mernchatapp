import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import { useInfoContext } from "./globleContext/InfoContext";
import { RoundWbSunny } from "./accts/iconIndex";
import BallPulseLoader from "./components/BallPulseLoader";

import "./App.css";
import CreateChat from "./components/createChat/CreateChat";

const ChatHome = lazy(() => import("./screens/chat/ChatHome"));
const SignIn = lazy(() => import("./screens/login/SignIn"));
const SignUp = lazy(() => import("./screens/login/SignUp"));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const { addPopup } = useInfoContext();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div className="App">
      <div className="moon-sun" onClick={() => setDarkMode((pre) => !pre)}>
        <RoundWbSunny width="24px" height="24px" />
      </div>
      {addPopup.open && <CreateChat />}
      <Routes>
        <Route path="/" element={<Index />}>
          <Route
            path="chat"
            element={
              <Suspense fallback={<BallPulseLoader />}>
                <ChatHome />
              </Suspense>
            }
          />
          <Route
            path="signin"
            element={
              <Suspense fallback={<BallPulseLoader />}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="signup"
            element={
              <Suspense fallback={<BallPulseLoader />}>
                <SignUp />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
