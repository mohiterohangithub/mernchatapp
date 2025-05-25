import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./components/Index";

import "./App.css";
import AuthContext from "./globleContext/AuthContext";

const ChatHome = lazy(() => import("./screens/chat/ChatHome"));
const SignIn = lazy(() => import("./screens/login/SignIn"));
const SignUp = lazy(() => import("./screens/login/SignUp"));

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
