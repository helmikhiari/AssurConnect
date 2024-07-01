import React, { useState, useEffect } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  changeAppointmentStatus,
  getAppsByStatus_Page,
  getCountAppsByStatus,
} from "../../../assets/Apis/assets";
import CustomLoading from "../../../components/customLoading";
import { chooseColorForApp, formatDateTime } from "../../../assets/functions";
import Modal from "../../../components/modal";

export default function Appointments() {
  const [activeTab, setActiveTab] = useState("All");
  const [data, setData] = useState([]);
  const [activeTabcountApps, setActiveTabCountApps] = useState();
  const [loadingCount, setLoadingCount] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [dialogType1, setDialogType1] = useState(false);
  const [dialogType1Title, setDialogType1Title] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const token = localStorage.getItem("token");

  const toogleDialogType1 = () => setDialogType1((prev) => !prev);
  const onTabChange = (value) => setActiveTab(value);
  const handlePrev = () => setCurrentPage((prev) => prev - 1);
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  const reload = () => window.location.reload();

  const fetchApps = async () => {
    const response = await getAppsByStatus_Page(token, currentPage, activeTab);
    setData(response);
  };

  useEffect(() => {
    const fetchAppsCount = async () => {
      setCurrentPage(0);
      setLoadingCount(true);
      const response = await getCountAppsByStatus(token, activeTab);
      setActiveTabCountApps(response);
      setLoadingCount(false);
    };
    fetchAppsCount();
  }, [activeTab]);

  useEffect(() => {
    fetchApps();
  }, [currentPage, activeTab]);

  const AproveRejectCancelApp = ({ open }) => {
    const [success, setSuccess] = useState(false);
    const formattedDate = formatDateTime(data[currentIndex]?.date, 1);
    const time = formatDateTime(data[currentIndex]?.date, 2);
    const changeStatus = async () => {
      const response = await changeAppointmentStatus(
        token,
        data[currentIndex]?.id,
        dialogType1Title
      );
      if (response) {
        setSuccess(true);
      }
    };
    return (
      <AlertDialog open={open}>
        {!success ? (
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {dialogType1Title} Appointment
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Date</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formattedDate}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Time</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {time}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Patient</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {data[currentIndex]?.patientFirstName}{" "}
                  {data[currentIndex]?.patientLastName}
                </div>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter className="mt-4 flex justify-between">
              <Button variant="secondary" onClick={toogleDialogType1}>
                Cancel
              </Button>
              <Button onClick={changeStatus}>Confirm</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : (
          <AlertDialogContent>
            <Modal
              title={"Appointment " + dialogType1Title + "ed with Success"}
              buttonTitle="Close"
              onClick={reload}
            />
          </AlertDialogContent>
        )}
      </AlertDialog>
    );
  };

  const DropDownApproved = ({ children, index }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer flex justify-center"
            onClick={() => console.log("clicked")}
          >
            Report
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer flex justify-center"
            onClick={() => {
              setDialogType1Title("Cancel");
              toogleDialogType1();
            }}
          >
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const DropDownWaiting = ({ children }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer flex justify-center"
            onClick={() => {
              setDialogType1Title("Approve");
              toogleDialogType1();
            }}
          >
            Approve
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer flex justify-center"
            onClick={() => {
              setDialogType1Title("Reject");
              toogleDialogType1();
            }}
          >
            Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <Tabs
        value={activeTab}
        className="flex w-auto "
        onValueChange={onTabChange}
      >
        <TabsList className="flex  w-full px-8 py-6 items-center">
          <TabsTrigger
            value="All"
            className="data-[state=active]:text-darkblue"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="Approved"
            className="data-[state=active]:text-green-500"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="Waiting"
            className="data-[state=active]:text-yellow-500"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="Rejected"
            className="data-[state=active]:text-red-500"
          >
            Rejected
          </TabsTrigger>
          <TabsTrigger
            value="Reported"
            className="data-[state=active]:text-orange-500"
          >
            Reported
          </TabsTrigger>
          <TabsTrigger
            value="Completed"
            className="data-[state=active]:text-teal-500"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="Cancelled"
            className="data-[state=active]:text-red-500"
          >
            Cancelled
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className=" drop-shadow mx-5 flex flex-col h-full w-full justify-between rounded-[25px]">
        <Table className="flex flex-col w-full text-center ">
          <TableHeader>
            <TableRow className="grid grid-cols-3  bg-darkblue hover:bg-darkblue text-white rounded-t-xl px-10">
              <TableHead className="text-left place-content-center">
                <p className="pl-5 text-white">Patient</p>
              </TableHead>
              <TableHead className="text-white place-content-center text-center">
                Date
              </TableHead>
              <TableHead className=" text-white place-content-center text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((app, index) => {
              const d = formatDateTime(app.date, 0);
              const color = chooseColorForApp(app.status);
              const textColor = app.status == "Waiting" ? "black" : "white";
              const dropdownvisibility =
                app.status === "Approved" || app.status === "Waiting";

              return (
                <TableRow className="grid grid-cols-3 px-10" key={app.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className=" h-14 w-14 text-darkblue">
                        <AvatarImage src={app?.patientPicture} />
                        <AvatarFallback className="uppercase">
                          {app.patientFirstName?.[0]}
                          {app.patientLastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium capitalize">
                          {app.patientFirstName} {app.patientLastName}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="flex justify-center items-center w-auto">
                    {d}
                  </TableCell>
                  <TableCell className="flex justify-end items-center w-auto">
                    {dropdownvisibility ? (
                      data[index].status === "Approved" ? (
                        <div onClick={() => setCurrentIndex(index)}>
                          <DropDownApproved>
                            <Badge
                              style={{
                                backgroundColor: color,
                                color: textColor,
                              }}
                            >
                              {app.status} <p className="pl-2">▼</p>
                            </Badge>
                          </DropDownApproved>
                        </div>
                      ) : (
                        <div onClick={() => setCurrentIndex(index)}>
                          <DropDownWaiting>
                            <Badge
                              style={{
                                backgroundColor: color,
                                color: textColor,
                              }}
                            >
                              {app.status} <p className="pl-2">▼</p>
                            </Badge>
                          </DropDownWaiting>
                        </div>
                      )
                    ) : (
                      <Badge
                        style={{ backgroundColor: color, color: textColor }}
                      >
                        {app.status}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <AproveRejectCancelApp open={dialogType1} />
        <Separator />
        <div>
          <PaginationContent className="flex justify-between px-[80px] bg-gray-50  rounded-bl-[25px] rounded-br-[25px]">
            <p className="flex justify-self-end cursor-default font-sm text-sm text-right">
              {!loadingCount ? (
                `${Math.min(
                  currentPage * 5 + 1,
                  activeTabcountApps
                )}-${Math.min(
                  (currentPage + 1) * 5,
                  activeTabcountApps
                )} of ${activeTabcountApps}`
              ) : (
                <CustomLoading className="w-7 h-7" />
              )}
            </p>
            <div className="flex self-center gap-10">
              {currentPage != 0 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePrev}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}

              {Math.min((currentPage + 1) * 5, activeTabcountApps) !=
                activeTabcountApps && (
                <PaginationItem onClick={handleNext} className="cursor-pointer">
                  <PaginationNext />
                </PaginationItem>
              )}
            </div>
          </PaginationContent>
        </div>
      </Card>
    </div>
  );
}
