import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./components/Index";

import "./App.css";
import AuthContext from "./globleContext/AuthContext";
import { RoundWbSunny } from "./accts/iconIndex";

const ChatHome = lazy(() => import("./screens/chat/ChatHome"));
const SignIn = lazy(() => import("./screens/login/SignIn"));
const SignUp = lazy(() => import("./screens/login/SignUp"));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or default to system preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

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
        <RoundWbSunny width="24px" height="24px" backgroundColor="inherit" />
      </div>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route
            path="chat"
            element={
              <Suspense fallback={<div>Loading....!</div>}>
                <AuthContext>
                  <ChatHome />
                </AuthContext>
              </Suspense>
            }
          />
          <Route
            path="signin"
            element={
              <Suspense fallback={<div>Loading....!</div>}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="signup"
            element={
              <Suspense fallback={<div>Loading....!</div>}>
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
