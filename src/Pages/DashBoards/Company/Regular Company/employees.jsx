import React, { useState, useEffect, useRef } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Separator } from "@/components/ui/separator";
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
  CountEmpBySearch,
  addEmployee,
  countEmployees,
  deleteEmployee,
  getEmployeesByPage,
  searchEmp,
} from "../../../../assets/Apis/assets";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { validateAddEmp, validateSearch } from "../../../../assets/validations";
import AlertModal from "../../../../components/alertModal";
function Employees() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const ManageEmployees = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState();

    const changeDeleteIndex = (index) => setDeleteIndex(index);
    const toggleShowDeleteDialog = () => setShowDeleteDialog((prev) => !prev);
    const [employeesCount, setEmployeesCount] = useState();
    const [loadingCount, setLoadingCount] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});
    const br = useRef();
    const [data, setData] = useState([
      {
        firstName: "Helmi",
        lastName: "Khiari",
        email: "hellmi.khiari@gmail.com",
        jobTitle: "Software Engineer",
        activePlan: "Yes",
      },
    ]);
    const handleDelete = (index) => {
      changeDeleteIndex(index);
      toggleShowDeleteDialog();
    };

    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleSearch = async (e) => {
      e.preventDefault();
      const validation = validateSearch(search);
      if (validation) {
        const searchCount = await CountEmpBySearch(token, search);
        if (searchCount) setEmployeesCount(searchCount);
        const response = await searchEmp(token, search, currentPage);
        if (response) {
          setData(response);
        }
      } else {
        setErrors({ search: "Please provide a valid name" });
      }
    };

    useEffect(() => {
      console.log(search);
      if (search != "") br.current.click();
    }, [currentPage]);

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
      if (search === "") {
        setCurrentPage(0);
        fetchEmployeesCount();
        fetchEmployees();
      }
    }, [search]);

    useEffect(() => {
      fetchEmployees();
    }, [currentPage]);

    const handlePrev = () => setCurrentPage((prev) => prev - 1);
    const handleNext = () => setCurrentPage((prev) => prev + 1);

    const handleEditClick = (index) => {
      navigate("/dashboard/employees/editEmployee", {
        state: data[index],
      });
    };

    const deleteEmp = async () => {
      const response = await deleteEmployee(token, data[deleteIndex].id);
      if (response) {
        toggleShowDeleteDialog();
      }
    };
    return (
      <div>
        <header className="mx-5 py-3">
          <form
            className="flex items-center justify-start"
            onSubmit={handleSearch}
          >
            <div className="flex justify-end relative w-full max-w-md ">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 " />
              <Input
                className="w-full rounded-xl bg-white mr-5 px-12 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary "
                placeholder="Search employees by name"
                type="search"
                onChange={handleSearchChange}
                value={search}
              />
            </div>
            <Button className="bg-darkblue text-white" type="submit" ref={br}>
              Search
            </Button>
          </form>
          {errors.search && (
            <span className="text-red-500 flex justify-start text-sm ">
              {errors.search}
            </span>
          )}
        </header>
        <Card className=" drop-shadow mx-5 flex flex-col  justify-between rounded-[25px]">
          <Table className="flex flex-col w-full text-center overflow-y-auto min-w-[800px]">
            <TableHeader>
              <TableRow className="grid grid-cols-5 bg-darkblue hover:bg-darkblue text-white rounded-t-xl px-10 ">
                <TableHead className="text-left place-content-center">
                  <p className="pl-5 text-white">Employee</p>
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Email
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Job Title
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Active Plan
                </TableHead>
                <TableHead className="text-white place-content-center text-center pl-[50px]">
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
                          <AvatarImage src={emp.picture} />
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-darkblue text-white hover:bg-black hover:text-white"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Separator />
          <div className="cursor-pointer ">
            <PaginationContent className="flex justify-between px-[80px] bg-gray-50 rounded-b-xl">
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
        <AlertDialog open={showDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Employee and remove his data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={toggleShowDeleteDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-700"
                onClick={deleteEmp}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

  const AddEmployee = () => {
    const [errors, setErrors] = useState({});
    const [succes, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      cin: "",
      birthDate: "",
      gender: "",
      jobTitle: "",
    });
    const hideDialog = () => setSuccess(false);
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    const handleGenderChange = (gender) => {
      setFormData({
        ...formData,
        gender,
      });
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      const validation = validateAddEmp(formData);
      if (Object.keys(validation).length == 0) {
        const response = await addEmployee(token, formData);
        if (response && !response.cin) {
          setFormData({
            firstName: "",
            lastName: "",
            cin: "",
            birthDate: "",
            gender: "",
            jobTitle: "",
          });
          setSuccess(true);
        } else if (response.cin) {
          setErrors(response);
        }
      } else {
        setErrors(validation);
      }
    };

    return (
      <>
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
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4 text-left text-darkblue">
              <div className="space-y-2">
                <Label className="font-medium" htmlFor="firstName">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter employee first name"
                  onChange={handleChange}
                  value={formData.firstName}
                />
                {errors.firstName && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-medium" htmlFor="lastName">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter employee last name"
                  onChange={handleChange}
                  value={formData.lastName}
                />
                {errors.lastName && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.lastName}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-medium" htmlFor="cin">
                  CIN
                </Label>
                <Input
                  id="cin"
                  placeholder="Enter employee CIN"
                  name="cin"
                  onChange={handleChange}
                  value={formData.cin}
                />
                {errors.cin && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.cin}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-medium" htmlFor="birthdate">
                  Birthdate
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  onChange={handleChange}
                  name="birthDate"
                  value={formData.birthDate}
                />
                {errors.birthDate && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.birthDate}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-medium" htmlFor="gender">
                  Gender
                </Label>
                <Select
                  id="gender"
                  onValueChange={handleGenderChange}
                  value={formData.gender}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.gender}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  className="font-medium"
                  htmlFor="job-title"
                  name="jobTitle"
                >
                  Job Title
                </Label>
                <Input
                  id="job-title"
                  placeholder="Enter employee job title"
                  onChange={handleChange}
                  name="jobTitle"
                  value={formData.jobTitle}
                />
                {errors.jobTitle && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.jobTitle}
                  </span>
                )}
              </div>
              <Button
                className="w-full bg-darkblue hover:bg-black"
                type="submit"
              >
                <UserPlusIcon className="h-5 w-5 mr-2" />
                Add Employee
              </Button>
            </CardContent>
          </form>
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
            <Input className="w-full md:w-auto" id="excel-upload" type="file" />
            <Button className="w-full md:w-auto bg-darkblue hover:bg-black">
              <UploadIcon className="h-5 w-5 mr-2" />
              Upload
            </Button>
          </CardContent>
        </Card>
        <AlertModal
          open={succes}
          title="Employee Added!"
          content="Your Employee has been successfully Added."
          onClick={hideDialog}
          buttonTitle="Dismiss"
        />
      </>
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
              <AddEmployee />
            </TabsContent>
            <TabsContent value="employees">
              <ManageEmployees />
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
export default Employees;
