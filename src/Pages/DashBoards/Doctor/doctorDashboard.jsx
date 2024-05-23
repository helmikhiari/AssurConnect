import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import DashboardCard from "../../../components/dashboardCard";
import RatingCard from "../../../components/ratingCard";
import prescriptionImg from "../../../assets/icons/prescription.png";
import imgPatient from "../../../assets/images/Vector1.png";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CalendarIcon, UsersIcon } from "../../../assets/icons/icons";
import { useEffect, useState } from "react";
import {
  getNextApppointment,
  getTodayAppointments,
} from "../../../assets/Apis/assets";

import { formatDateTime } from "../../../assets/functions";
export default function DoctorDashboard() {
  const [nextAppWindowInfo, setNextAppWindowInfo] = useState();
  const [todayAppointments, setTodayAppointments] = useState();
  const [prescriptionVisibility, setPrescriptionVisibility] = useState(false);
  const tooglePrescriptionVisibility = () =>
    setPrescriptionVisibility((prev) => !prev);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getNextApp = async () => {
      const response = await getNextApppointment(token);
      if (response) {
        setNextAppWindowInfo(response);
      }
    };
    getNextApp();
  }, []);

  useEffect(() => {
    const getTodayApps = async () => {
      const response = await getTodayAppointments(token);
      console.log(response)
      if (response!==null) {
        
        setTodayAppointments(response);
      }
    };
    getTodayApps();
  }, []);

  const Patient = ({ firstName, lastName, picture, date }) => {
    const formattedDate = formatDateTime(date, 2);
    return (
      <>
        <div className="grid grid-cols-2 items-center px-5 py-3  hover:bg-yellow-100 rounded transition duration-500">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="h-14 w-14 text-darkblue">
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
          <p>{formattedDate}</p>
        </div>
        <Separator />
      </>
    );
  };

  const Prescription = ({ open, onClick }) => {
    return (
      <AlertDialog open={open}>
        <AlertDialogContent className="bg-white rounded-lg shadow-lg p-8 w-full mx-auto  overflow-y-auto max-h-screen">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Medical Prescription</h1>
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
              Prescription #123456
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h2 className="text-lg font-medium mb-2">Patient Information</h2>
              <div className="text-gray-600">
                <p>Name: John Doe</p>
                <p>Date of Birth: 01/01/1980</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="text-lg font-medium mb-2">Prescribed Medications</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-800 font-medium">Amoxicillin</h3>
                  <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                    500mg
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Take 1 capsule every 8 hours for 10 days.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-800 font-medium">Ibuprofen</h3>
                  <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                    200mg
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Take 1 tablet every 6 hours as needed for pain.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-800 font-medium">Zyrtec</h3>
                  <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                    10mg
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Take 1 tablet daily for allergy relief.
                </p>
              </div>
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
          <CardContent>
            <div className="text-sm font-medium text-gray-900 text-left">
              {nextAppWindowInfo?.nextApp.date}
            </div>
            <div className="flex flex-row gap-5 pt-5">
              <Avatar className="h-14 w-14 text-darkblue">
                <AvatarImage src={nextAppWindowInfo?.nextApp.patientPicture} />
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
                {!nextAppWindowInfo?.prevApp.details
                  ? nextAppWindowInfo?.prevApp.details
                  : "No details available for the last appointment."}
              </p>
              {/* function splitText into phrases  */}
            </div>
            <Button
              className="ml-auto shadow hover:drop-shadow mt-5"
              variant="primary"
            >
              Start Appointment
            </Button>
          </CardContent>
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
            ? todayAppointments?.map((patient,index) => (
                <Patient
                key={index}
                  picture={patient.patientPicture}
                  date={patient.date}
                  firstName={patient.patientFirstName}
                  lastName={patient.patientLastName}
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Patients"
            number="2,350"
            subNumber="+180.1% from last year"
          >
            <UsersIcon className="w-4 h-4 text-darkblue" />
          </DashboardCard>

          <DashboardCard
            title="Upcoming Appointments"
            number="+12"
            subNumber="in the next 7 days"
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

        {/* <Card className="mt-6 drop-shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      alt="Patient Avatar"
                      className="rounded-full"
                      height="32"
                      src={prescriptionImg}
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        #12345
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Checkup</TableCell>
                <TableCell>May 22, 2023</TableCell>
                <TableCell>
                  <Badge variant="success">Confirmed</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      alt="Patient Avatar"
                      className="rounded-full"
                      height="32"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                    <div>
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        #54321
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Surgery Consultation</TableCell>
                <TableCell>June 1, 2023</TableCell>
                <TableCell>
                  <Badge variant="warning">Pending</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      alt="Patient Avatar"
                      className="rounded-full"
                      height="32"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                    <div>
                      <div className="font-medium">Michael Johnson</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        #98765
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Routine Checkup</TableCell>
                <TableCell>June 15, 2023</TableCell>
                <TableCell>
                  <Badge variant="success">Confirmed</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card> */}
      </div>
    </div>
  );
}
