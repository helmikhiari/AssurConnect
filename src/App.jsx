import { useContext, useEffect } from "react";
import Home from "./Pages/Home/home.jsx";
import Signup from "./Pages/Auth/signup.jsx";
import "./App.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
  
} from "react-router-dom";
import RootLayout from "./rootLayout";
import AboutUs from "./Pages/Home/about.jsx";
import { userContext } from "./Context/userContext.jsx";
import Login from "./Pages/Auth/login";
import DashboardLayout from "./Pages/DashBoards/dashboardLayout";
import Settings from "./Pages/DashBoards/settings.jsx";
import Profile from "./Pages/DashBoards/profile.jsx";
import Dashboard from "./Pages/DashBoards/dashboard.jsx";
import Contact from "./Pages/Home/contact.jsx";
import ForgetPassword from "./Pages/Auth/forgetPassword.jsx";
import Appointments from "./Pages/DashBoards/Doctor/appointments.jsx";
import Unauthorized from "./Pages/unauthorized.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import MakeApp from "./Pages/DashBoards/Doctor/makeApp.jsx";
import Employees from "./Pages/DashBoards/Company/Regular Company/employees.jsx";

import AssuranceDetails from "./Pages/DashBoards/Company/Regular Company/assuranceDetails.jsx";
import ServerDown from "./Pages/serverDown.jsx";
import EditEmployee from "./Pages/DashBoards/Company/Regular Company/editEmployee.jsx";
import ManagePlan from "./Pages/DashBoards/Company/Regular Company/managePlan.jsx";
import { health } from "./assets/Apis/assets.js";
import Plans from "./Pages/DashBoards/Company/plans.jsx";
import RefundRequests from "./Pages/DashBoards/Company/Assurance/refund.jsx";
import EmployeClaim from "./Pages/DashBoards/Company/Regular Company/employeClaims.jsx";
import AdminLogin from "./Pages/Admin/login.jsx";
import AdminDashboard from "./Pages/Admin/adminDashboard.jsx";
import Users from "./Pages/Admin/doctors.jsx";
import Doctors from "./Pages/Admin/doctors.jsx";
import Companies from "./Pages/Admin/companies.jsx";
import EditDoctor from "./Pages/Admin/editDoctor.jsx";
import EditCompany from "./Pages/Admin/editCompany.jsx";
import Assurances from "./Pages/Admin/assurances.jsx";
import EditAssurance from "./Pages/Admin/editAssurance.jsx";
import Pharmacies from "./Pages/Admin/pharmacies.jsx";
import EditPharmacy from "./Pages/Admin/editPharmacy.jsx";

export default function App() {
  const healthCheck = async () => {
    const response = await health();
    console.log(response);
    if (response.status == "DOWN") {
      console.log("here");
      window.location.replace("/serverDown");
    }
  };
  const { loadMe, setActiveProfile, activeProfile } = useContext(userContext);
  useEffect(() => {
    const fetchData = async () => {
      // await healthCheck()
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
        {
          path: "/forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "/error",
          element: <ServerDown />,
        },
        {
          path: "/serverDown",
          element: <ServerDown />,
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
        {
          path: "/dashboard/appointments",
          element: (
            <ProtectedRoute allowedRole="Doctor" role={activeProfile?.role}>
              <Appointments />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/startApp",
          element: (
            <ProtectedRoute allowedRole="Doctor" role={activeProfile?.role}>
              <MakeApp />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/employees",
          element: (
            <ProtectedRoute allowedRole="Company" role={activeProfile?.role}>
              <Employees />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/plans",
          element: (
            <ProtectedRoute
              allowedRole={["Company", "Assurance","Admin"]}
              role={activeProfile?.role}
            >
              <Plans />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/plans/managePlan",
          element: (
            <ProtectedRoute allowedRole="Company" role={activeProfile?.role}>
              <ManagePlan />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/plans/assuranceDetails",
          element: (
            <ProtectedRoute allowedRole="Company" role={activeProfile?.role}>
              <AssuranceDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/employees/editEmployee",
          element: (
            <ProtectedRoute allowedRole="Company" role={activeProfile?.role}>
              <EditEmployee />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/refundRequests",
          element: (
            <ProtectedRoute allowedRole="Assurance" role={activeProfile?.role}>
              <RefundRequests />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/employeClaim",
          element: (
            <ProtectedRoute allowedRole="Company" role={activeProfile?.role}>
              <EmployeClaim />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/unauthorized",
          element: <Unauthorized />,
        },
        {
          path: "/dashboard/users",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <Users />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/doctors",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <Doctors />
            </ProtectedRoute>
          ),
          
        },
        {
          path: "/dashboard/doctors/editDoctor",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <EditDoctor />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/companies",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <Companies />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/companies/editCompany",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <EditCompany />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/assurances",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <Assurances />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/assurances/editAssurance",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <EditAssurance />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/pharmacies",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <Pharmacies />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/pharmacies/editPharmacy",
          element: (
            <ProtectedRoute allowedRole="Admin" role={activeProfile?.role}>
              <EditPharmacy />
            </ProtectedRoute>
          ),
        },
      ],
    },
    { 
      path:"/adminLogin",
      element: <AdminLogin />,
    },
        
      
    
  ]);

  return (
    <RouterProvider router={router}>
      <RootLayout />
    </RouterProvider>
  );
}
