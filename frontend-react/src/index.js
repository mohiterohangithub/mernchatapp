import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import AuthContext from "./globleContext/AuthContext";
import UserContext from "./globleContext/UserContext";
import InfoContext from "./globleContext/InfoContext";
import MessageContext from "./globleContext/MessageContext";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <InfoContext>
          <AuthContext>
            <UserContext>
              <MessageContext>
                <App />
              </MessageContext>
            </UserContext>
          </AuthContext>
        </InfoContext>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
