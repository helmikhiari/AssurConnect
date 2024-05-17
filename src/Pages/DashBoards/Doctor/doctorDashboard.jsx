import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading";
import { userContext } from "../../../Context/userContext";
import SideBar from "../../../components/sidebar";
import { DashboardIcon } from "../../../assets/icons/icons";
export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { activeProfile } = useContext(userContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeProfile != null) {
      //if active profile!=null then i've got a response from loadMe whether data=user or data=false
      // console.log(activeProfile);
      if (activeProfile.data) {
        setLoading(false);
      } else {
        navigate("/login");
      }
    }
  }, [activeProfile]);

  
  return !loading ? <div className="bg-red-500 w-full"><h1 >Hello Doctor</h1></div> : <Loading />;
}


