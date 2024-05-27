import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../../components/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userContext";
import Loading from "../../components/loading";
import { AppointmentIcon, DashboardIcon, SettingsIcon } from "../../assets/icons/icons";
import InfoBar from "../../components/infobar";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();
  const { activeProfile } = useContext(userContext);
  useEffect(() => {
    if (activeProfile != null) {
      //if active profile!=null then i've got a response from loadMe whether data=user or data=false
      console.log("here" + activeProfile.data);
      if (activeProfile.data) {
        setLoading(false);
      } else {
        navigate("/login");
      }
    }
  }, [activeProfile]);


  const links = [
    {
      text: "Dashboard",
      url: "/dashboard",
      icon: <DashboardIcon className="h-5 w-5" />,
    },

    {
      text: "Setting",
      url: "/dashboard/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
    },
  ];

  if (activeProfile?.role==="Doctor")
    {
      links.push(
        {
          text:"Appointments",
          url:"/dashboard/appointments",
          icon:<AppointmentIcon className="h-6 w-6"/>
        }
      )
    }
  
  return !loading ? (
    <div className="flex h-screen overflow-hidden ">
      <SideBar links={links} className="sticky top-0 h-full"/>
      <div className="flex flex-col grow shrink w-screen h-screen">
        <InfoBar />
        <div className="flex-grow overflow-y-auto h-screen sm:ml-[200px]  pt-[50px] sm:pt-6  justify-center bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] to-white p-6">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default DashboardLayout;
