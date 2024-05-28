import React, { useState, useEffect } from "react";
import { UploadIcon, UserPlusIcon } from "../../../../assets/icons/icons";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import CustomLoading from "../../../../components/customLoading";
import { TabsTrigger, TabsList, Tabs, TabsContent } from "@/components/ui/tabs";
import {
  countEmployees,
  getEmployeesByPage,
} from "../../../../assets/Apis/assets";
function Employees() {
  const token = localStorage.getItem("token");

  const ManageEmployees = () => {
    const [data, setData] = useState([
      {
        firstName: "Helmi",
        lastName: "Khiari",
        email: "hellmi.khiari@gmail.com",
        jobTitle: "Software Engineer",
        activePlan: "Yes",
      },
    ]);
    const [employeesCount, setEmployeesCount] = useState();
    const [loadingCount, setLoadingCount] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentIndex, setCurrentIndex] = useState();

    const fetchEmployees = async () => {
      const response = await getEmployeesByPage(token, currentPage);
      if (response) setData(response);
    };

    const fetchEmployeesCount = async () => {
      setLoadingCount(true);
      const response = await countEmployees(token);
      if (response) setEmployeesCount(response);
      setLoadingCount(false);
    };

    useEffect(() => {
      fetchEmployeesCount();
    }, []);

    useEffect(() => {
      fetchEmployees();
    }, [currentPage]);

    const handlePrev = () => setCurrentPage((prev) => prev - 1);
    const handleNext = () => setCurrentPage((prev) => prev + 1);
    return (
      <Card className=" drop-shadow mx-5 flex flex-col w-full justify-between rounded-[25px]">
        <Table className="flex flex-col w-full text-center overflow-y-auto min-w-[800px]">
          <TableHeader>
            <TableRow className="grid grid-cols-5 bg-gray-200 rounded-tr-[25px] rounded-tl-[25px] px-10 ">
              <TableHead className="text-left place-content-center">
                <p className="pl-5 text-darkblue">Employee</p>
              </TableHead>
              <TableHead className="text-darkblue place-content-center text-center">
                Email
              </TableHead>
              <TableHead className="text-darkblue place-content-center text-center">
                Job Title
              </TableHead>
              <TableHead className="text-darkblue place-content-center text-center">
                Active Plan
              </TableHead>
              <TableHead className="text-darkblue place-content-center text-center pl-[50px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((emp, index) => {
              return (
                <TableRow className="grid grid-cols-5 pl-5" key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className=" h-14 w-14 text-darkblue">
                        <AvatarImage src={emp.Picture} />
                        <AvatarFallback className="uppercase">
                          {emp.firstName[0]}
                          {emp.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium capitalize">
                          {emp.firstName} {emp.lastName}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="flex justify-center items-center w-auto">
                    {emp.email}
                  </TableCell>
                  <TableCell className="flex justify-center items-center w-auto">
                    {emp.jobTitle}
                  </TableCell>
                  <TableCell className="flex justify-center items-center w-auto pr-12">
                    {emp.activePlan}
                  </TableCell>
                  <TableCell className="flex items-center justify-end w-auto gap-5">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button color="red" size="sm" variant="outline">
                      Delete
                    </Button>
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
                `${Math.min(currentPage * 5 + 1, employeesCount)}-${Math.min(
                  (currentPage + 1) * 5,
                  employeesCount
                )} of ${employeesCount}`
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

              {Math.min((currentPage + 1) * 5, employeesCount) !=
                employeesCount && (
                <PaginationItem onClick={handleNext}>
                  <PaginationNext />
                </PaginationItem>
              )}
            </div>
          </PaginationContent>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h">
      <div className="flex-1 transition-all duration-500 ease-in-out">
        <Tabs
          className=" items-center gap-0 transition-all duration-500 ease-in-out"
          defaultValue="employees"
        >
          <TabsList className="gap-0 flex w-min">
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="employees"
            >
              Employees
            </TabsTrigger>
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="add-employee"
            >
              Add Employee
            </TabsTrigger>
          </TabsList>

          <main className="flex flex-1  flex-col flex-wrap gap-1 ">
            {/* <div className="flex flex-row flew-wrap gap-6 "> */}
            <TabsContent
              value="add-employee"
              className="flex flex-col sm:flex-row  w-full gap-6 "
            >
              <Card className="flex w-max flex-col rounded-xl shadow-lg border-[0px] border-darkblue text-darkblue md:w-1/2 self-center">
                <CardHeader>
                  <CardTitle className="uppercase">
                    <UserPlusIcon className="h-5 w-5 mr-2" />
                    Add Employee
                  </CardTitle>
                  <CardDescription>
                    Fill out the form to add a new employee.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-left text-darkblue">
                  <div className="space-y-2">
                    <Label className="font-medium" htmlFor="firstName">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter employee first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium" htmlFor="lastName">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter employee last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium" htmlFor="cin">
                      CIN
                    </Label>
                    <Input id="cin" placeholder="Enter employee CIN" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium" htmlFor="birthdate">
                      Birthdate
                    </Label>
                    <Input id="birthdate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium" htmlFor="gender">
                      Gender
                    </Label>
                    <Select id="gender">
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium" htmlFor="job-title">
                      Job Title
                    </Label>
                    <Input
                      id="job-title"
                      placeholder="Enter employee job title"
                    />
                  </div>
                  <Button
                    className="w-full bg-darkblue hover:bg-black"
                    type="submit"
                  >
                    <UserPlusIcon className="h-5 w-5 mr-2" />
                    Add Employee
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col w-max h-min rounded-xl shadow-lg border-[0px] border-darkblue md:w-1/2">
                <CardHeader>
                  <CardTitle className="uppercase">
                    <UploadIcon className="h-5 w-5 mr-5" />
                    Add Employees via Excel
                  </CardTitle>
                  <CardDescription>
                    Upload an Excel file to add multiple employees at once.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <Input
                    className="w-full md:w-auto"
                    id="excel-upload"
                    type="file"
                  />
                  <Button className="w-full md:w-auto bg-darkblue hover:bg-black">
                    <UploadIcon className="h-5 w-5 mr-2" />
                    Upload
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="employees"
              className="flex items-center justify-center"
            >
              <ManageEmployees />
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
export default Employees;
