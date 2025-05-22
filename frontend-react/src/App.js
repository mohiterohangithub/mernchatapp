import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./components/Index";

import "./App.css";
import AuthContext from "./globleContext/AuthContext";

const ChatHome = lazy(() => import("./screens/chat/ChatHome"));
const Login = lazy(() => import("./screens/login/Login"));

function App() {
  return (
    <div className="App">
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
            path="login"
            element={
              <Suspense fallback={<div>Loading....!</div>}>
                <Login />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
