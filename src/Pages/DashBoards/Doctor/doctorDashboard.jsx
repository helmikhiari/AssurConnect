import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import DashboardCard from "../../../components/dashboardCard";
import RatingCard from "../../../components/ratingCard";
import prescriptionImg from "../../../assets/icons/prescription.png";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CalendarIcon, UsersIcon } from "../../../assets/icons/icons";
import { useEffect, useState } from "react";
import {
  getNextApppointment,
  getNumberOfAppsNextWeek,
  getTodayAppointments,
  sendPatientOtp,
} from "../../../assets/Apis/assets";
import {
  areDatesWithinXMinutes,
  formatDateTime,
} from "../../../assets/functions";
import noAppsImg from "../../../assets/images/noAppsAvailable.jpg";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const [nextAppWindowInfo, setNextAppWindowInfo] = useState();
  const [todayAppointments, setTodayAppointments] = useState();
  const [nextWeekAppsNumber, setNextWeekAppsNumber] = useState();
  const [prescriptionVisibility, setPrescriptionVisibility] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const startApp = (appData) => {
    sendPatientOtp(token, appData._id);
    navigate("/dashboard/startApp", { state: appData });
  };

  const tooglePrescriptionVisibility = () =>
    setPrescriptionVisibility((prev) => !prev);

  useEffect(() => {
    const getNextApp = async () => {
      const response = await getNextApppointment(token);
      console.log(response);
      setNextAppWindowInfo(response);
    };
    getNextApp();
  }, []);

  useEffect(() => {
    const getTodayApps = async () => {
      const response = await getTodayAppointments(token);
      if (response !== null) {
        setTodayAppointments(response);
      }
    };
    getTodayApps();
  }, []);

  useEffect(() => {
    const getNumberApps = async () => {
      const response = await getNumberOfAppsNextWeek(token);

      setNextWeekAppsNumber(response);
    };
    getNumberApps();
  });

  const Patient = ({ firstName, lastName, picture, date, status, onClick }) => {
    const formattedDate = formatDateTime(date, 2);
    const appDate = new Date(date);
    const now = new Date(Date.now());
    let color;
    const a = areDatesWithinXMinutes(date, now, 15); ///if more than 15 late ,i will be cancelled ,the doctor can choose this interval
    if (appDate.getTime() < now.getTime() && a && status != "Completed") {
      color = "rgb(250 204 21)";
    } else if (appDate.getTime() < now.getTime() && status != "Completed") {
      color = "rgb(248 113 113)";
    } else if (status === "Completed") {
      color = "rgb(74 222 128)";
    } else {
      color = "white";
    }

    return (
      <>
        <div
          style={{ backgroundColor: color }}
          className={`grid grid-cols-6 items-center px-5 py-3  rounded transition duration-500`}
        >
          <div className="col-span-3 gap-4 flex flex-row   items-center	">
            <Avatar className=" h-14 w-14 text-darkblue">
              <AvatarImage src={picture} />
              <AvatarFallback className="uppercase">
                {firstName[0]}
                {lastName[0]}
              </AvatarFallback>
            </Avatar>
            <p className="font-md text-sm capitalize">
              {firstName} {lastName}
            </p>
          </div>
          <p className="col-span-2">{formattedDate}</p>
          {color == "rgb(250 204 21)" && (
            <Button className="col-span-1 " onClick={onClick}>
              Start Now
            </Button>
          )}
        </div>
        <Separator />
      </>
    );
  };

  const Prescription = ({ open, onClick }) => {
    if (nextAppWindowInfo !== false && nextAppWindowInfo != undefined)
      return (
        <AlertDialog open={open}>
          <AlertDialogContent className="bg-white rounded-lg shadow-lg p-8 w-full mx-auto  overflow-y-auto max-h-screen">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Medical Prescription</h1>
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
                Prescription #{nextAppWindowInfo?.presId}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h2 className="text-lg font-medium mb-2">
                  Patient Information
                </h2>
                <div className="text-gray-600">
                  <p className="capitalize">
                    Name: {nextAppWindowInfo?.nextApp.patientFirstName}{" "}
                    {nextAppWindowInfo?.nextApp.patientLastName}
                  </p>
                  {/* <p>Date of Birth: 01/01/1980</p> */}
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h2 className="text-lg font-medium mb-2">
                Prescribed Medications
              </h2>
              <div className="space-y-4">
                {nextAppWindowInfo?.prescription?.map((med) => {
                  return (
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-800 font-medium">
                          {med?.name}
                        </h3>
                        <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                          {med?.dosage}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {med?.instruction}
                      </p>
                    </div>
                  );
                })}
              </div>
              <Button
                onClick={onClick}
                className="w-full rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b] mt-5"
              >
                Close
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      );
  };

  const NextApp = () => {
    return (
      <div>
        <Card className="drop-shadow h-auto ">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg  font-medium">
              Next Appointment
            </CardTitle>
            <CalendarIcon className="w-4 h-4 text-darkblue " />
          </CardHeader>
          {nextAppWindowInfo !== false ? (
            <CardContent>
              <div className="text-sm font-medium text-gray-900 text-left">
                {nextAppWindowInfo?.nextApp.date}
              </div>
              <div className="flex flex-row gap-5 pt-5">
                <Avatar className="h-14 w-14 text-darkblue">
                  <AvatarImage
                    src={nextAppWindowInfo?.nextApp.patientPicture}
                  />
                  <AvatarFallback className="uppercase">
                    {nextAppWindowInfo?.nextApp.patientFirstName[0]}
                    {nextAppWindowInfo?.nextApp.patientLastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium flex justify-center items-center capitalize">
                  {nextAppWindowInfo?.nextApp.patientFirstName}{" "}
                  {nextAppWindowInfo?.nextApp.patientLastName}
                </div>
              </div>
              <div className="mt-4 py-2 px-1 rounded-lg shadow-md flex  flex-col">
                <p className="text-[14px] font-medium text-left text-black">
                  Last Appointment: {nextAppWindowInfo?.prevApp.date}
                </p>
                <div className="flex flex-row gap-3 pt-3">
                  <p className="text-[13px] font-medium text-left text-black">
                    Prescription
                  </p>

                  <img
                    alt="prescription picture"
                    onClick={tooglePrescriptionVisibility}
                    className="cursor-pointer hover:w-[26px] hover:h-[26px]"
                    height="24"
                    src={prescriptionImg}
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="24"
                  />
                </div>
                <p className="text-[13px] font-medium text-left text-black">
                  Notes
                </p>
                <p className="text-left text-sm">
                  {nextAppWindowInfo?.prevApp.details
                    ? nextAppWindowInfo?.prevApp.details
                    : "No details available for the last appointment."}
                </p>
                {/* function splitText into phrases  */}
              </div>
              <Button
                className="ml-auto shadow hover:drop-shadow mt-5"
                variant="primary"
                onClick={() => startApp(nextAppWindowInfo?.nextApp)}
              >
                Start Appointment
              </Button>
            </CardContent>
          ) : (
            <div className="flex flex-col justify-center items-center ">
              <img
                alt="No Appointments Available "
                height="250"
                src={noAppsImg}
                width="250"
              />
              <p className="text-[14px] font-medium text-left text-darkblue flex flex-wrap justify-center text-center pb-10 pt-5">
                Currently, there are no upcoming appointments scheduled. Please
                check back later or manage your schedule as needed.
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  };

  const AllApps = () => {
    const today = new Date(Date.now());
    const formattedToday = formatDateTime(today, 1);
    return (
      <Card className={`drop-shadow max-h-[500px] overflow-y-auto`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 ">
          <CardTitle className="text-lg font-medium">
            Today's Appointments
          </CardTitle>
          <CardTitle className="text-md font-medium">
            {formattedToday}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-2">
          {todayAppointments !== false
            ? todayAppointments?.map((patient, index) => (
                <Patient
                  key={index}
                  picture={patient.patientPicture}
                  date={patient.date}
                  firstName={patient.patientFirstName}
                  lastName={patient.patientLastName}
                  status={patient.status}
                  onClick={() => startApp(patient)}
                />
              ))
            : "No Appointments for today"}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex ">
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="New Patients"
            number="+30"
            subNumber="+37% from last month"
          >
            <UsersIcon className="w-4 h-4 text-darkblue" />
          </DashboardCard>

          <DashboardCard
            title="Upcoming Appointments"
            // number={`+${nextWeekAppsNumber}`}
            number={'+24  '}
            subNumber="in the next 7 days"
          >
            <CalendarIcon className="w-4 h-4 text-darkblue" />
          </DashboardCard>
          
          <DashboardCard
            title="Completed Appointments"
            number="170"
            subNumber="Last 30 days"
          >
            <CalendarIcon className="w-4 h-4 text-darkblue" />
          </DashboardCard>
          <RatingCard title="Reviews" rating="4.8" numberOfReviews="1,225" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <NextApp />
          <AllApps />
        </div>
        <Prescription
          open={prescriptionVisibility}
          onClick={tooglePrescriptionVisibility}
        />
      </div>
    </div>
  );
}
