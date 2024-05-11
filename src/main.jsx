import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/home.jsx";
import Login from "./Pages/Auth/login.jsx";
import { ThemeProvider } from "./Context/themeContext.jsx";
import Signup from "./Pages/Auth/signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <App />
    </ThemeProvider>
    <RouterProvider router={router} />
  </React.StrictMode>
);
