import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

import { ThemeProvider } from "./Context/themeContext.jsx";
import { UserContextProvider } from "./Context/userContext.jsx";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider defaultTheme="light" storageKey="theme"> */}
    <UserContextProvider>
      <App />
    </UserContextProvider>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
