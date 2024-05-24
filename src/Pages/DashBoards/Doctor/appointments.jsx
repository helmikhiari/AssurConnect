import React, { useState, useEffect } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  TableFooter,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getAppsByStatus_Page,
  getCountAppsByStatus,
} from "../../../assets/Apis/assets";

import CustomLoading from "../../../components/customLoading";
import { chooseColorForApp, formatDateTime } from "../../../assets/functions";

export default function Appointments() {
  const [activeTab, setActiveTab] = useState("All");
  const [data, setData] = useState();
  const [activeTabcountApps, setActiveTabCountApps] = useState();
  const [loadingCount, setLoadingCount] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [DialogType1, setDialogType1] = useState(false);
  const token = localStorage.getItem("token");

  const toogleDialogType1 = () => setDialogType1((prev) => !prev);
  const onTabChange = (value) => setActiveTab(value);
  const handlePrev = () => setCurrentPage((prev) => prev - 1);
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  const getDropDownData = (status) => {
    let data = {};
    if (status === "Approved") {
      data.title1 = "Report";
      data.title2 = "Cancel";
    } else {
      data.title1 = "Approve";
      data.title2 = "Reject";
    }
    return data;
  };

  const fetchApps = async () => {
    const response = await getAppsByStatus_Page(token, currentPage, activeTab);
    setData(response);
    console.log(response);
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

  const AproveRejectCancelApp = ({
    button1Title,
    button2Title,
    children,
    index,
    open,
  }) => {
    const formattedDate = formatDateTime(date, 1);
    const time = formatDateTime(date, 2);
    let onClick2;
    let onClick1;
    if (data[index].status === "Approved") {
      onClick1 = approveApp;
      onClick2 = rejectApp;
    }
    return (
      <Dialog open={open}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title} Appointment</DialogTitle>
          </DialogHeader>
          <CardContent className="space-y-4">
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
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {firstName} {lastName}
              </div>
            </div>
          </CardContent>
          <DialogFooter className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={onClick1}>
              {button1Title}
            </Button>
            <Button onClick={onClick2}>{button2Title}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const DropDown = ({ children, title1, title2, title3, index }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <AproveRejectCancelApp index={index}>
            <DropdownMenuItem
              className="cursor-pointer flex justify-center"
              onClick={onClick1}
            >
              {title1}
            </DropdownMenuItem>
          </AproveRejectCancelApp>
          <AproveRejectCancelApp index={index}>
            <DropdownMenuItem
              className="cursor-pointer flex justify-center"
              onClick={onClick2}
            >
              {title2}
            </DropdownMenuItem>
          </AproveRejectCancelApp>
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
        </TabsList>
      </Tabs>

      <Card className=" drop-shadow mx-5 flex flex-col h-full w-full justify-between rounded-[25px]">
        <Table className="flex flex-col w-full text-center ">
          <TableHeader>
            <TableRow className="grid grid-cols-3 bg-gray-200 rounded-tr-[25px] rounded-tl-[25px] px-10">
              <TableHead className="text-left place-content-center">
                <p className="pl-5 text-darkblue">Patient</p>
              </TableHead>
              <TableHead className="text-darkblue place-content-center text-center">
                Date
              </TableHead>
              <TableHead className="text-center text-darkblue place-content-center text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((app, index) => {
              const d = formatDateTime(app?.date, 0);
              const color = chooseColorForApp(app.status);
              const textColor = app.status == "Waiting" ? "black" : "white";
              const dropdownvisibility =
                app.status === "Approved" || app.status === "Waiting";
              const dropDownData = getDropDownData(app.status);
              return (
                <TableRow className="grid grid-cols-3 px-10" key={app.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className=" h-14 w-14 text-darkblue">
                        <AvatarImage src={app.patientPicture} />
                        <AvatarFallback className="uppercase">
                          {app.patientFirstName[0]}
                          {app.patientLastName[0]}
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
                      <DropDown
                        index={index}
                        title1={dropDownData.title1}
                        title2={dropDownData.title2}
                        title3={dropDownData.title3}
                      >
                        <Badge
                          style={{ backgroundColor: color, color: textColor }}
                        >
                          {app.status} <p className="pl-2">▼</p>
                        </Badge>
                      </DropDown>
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

        <div className="cursor-pointer ">
          <PaginationContent className="flex justify-between px-[80px] bg-gray-200  rounded-bl-[25px] rounded-br-[25px]">
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
                  <PaginationPrevious onClick={handlePrev} />
                </PaginationItem>
              )}

              {Math.min((currentPage + 1) * 5, activeTabcountApps) !=
                activeTabcountApps && (
                <PaginationItem onClick={handleNext}>
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
