import { useContext, useEffect } from "react";
import Home from "./Pages/Home/home.jsx";
import Signup from "./Pages/Auth/signup.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./rootLayout";
import AboutUs from "./Pages/Home/about.jsx";
import { userContext } from "./Context/userContext.jsx";
import Login from "./Pages/Auth/login";
import DashboardLayout from "./Pages/DashBoards/dashboardLayout";
import Settings from "./Pages/DashBoards/settings.jsx";
import Profile from "./Pages/DashBoards/Profile.jsx";
import Dashboard from "./Pages/DashBoards/dashboard.jsx";
import Contact from "./Pages/Home/contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { element: <Home />, index: true },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
    ],
  },
]);
export default function App() {
  const { loadMe, setActiveProfile } = useContext(userContext);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await loadMe(token);
        setActiveProfile(response);
        console.log(response);
      } else {
        setActiveProfile({ data: false });
      }
    };

    fetchData();
  }, []);
  return (
    <RouterProvider router={router}>
      <RootLayout />
    </RouterProvider>
  );
}
