import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TabsTrigger, TabsList, Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import {
  validateAddPlan,
  validateDoctorFormAdmin,
} from "../../assets/validations";
import { addPlanAssurance } from "../../assets/Apis/assets";
import AlertModal from "../../components/alertModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SearchIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import CustomLoading from "../../components/customLoading";
import { useNavigate } from "react-router-dom";
import {
  addDoctorAdmin,
  deleteDoctorAdmin,
  getDoctorAdmin,
  getDoctors,
  getDoctorsCount,
  getDoctorssSearchCount,
} from "../../assets/Apis/admin";

export default function Doctors() {
  const TOKEN = localStorage.getItem("token");

  const AddDoctor = () => {
    const [errors, setErrors] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      speciality: "",
      experience: "",
      price: "",
      email: "",
      cin: "",
      password: "",
      confirmPassword: "",
      gender: "",
      birthDate: "",
      bio: "",
      address: "",
    });

    const hideDialog = () => setShowDialog(false);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const addDoctorr = async (e) => {
      e.preventDefault();
      setButtonDisabled(true);
      const validation = validateDoctorFormAdmin(formData);
      if (Object.keys(validation).length === 0) {
        const response = await addDoctorAdmin(TOKEN, formData);
        if (response && !response.cin && !response.email) {
          setShowDialog(true);
          window.location.reload();
        } else {
          setErrors(response);
        }
      } else {
        setErrors(validation);
      }
      setButtonDisabled(false);
    };

    const handleGenderChange = (e) => setFormData({ ...formData, gender: e });

    return (
      <>
        <form className="flex justify-center text-left" onSubmit={addDoctorr}>
          <Card className="w-full max-w-4xl drop-shadow-xl rounded-t-2xl">
            <CardHeader className="bg-darkblue text-white rounded-t-2xl mb-5">
              <CardTitle>Add A Doctor</CardTitle>
              <CardDescription>
                Fill out the details to add a doctor.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Enter doctor last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.lastName}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="Enter doctor first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    name="firstName"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cin">CIN</Label>
                  <Input
                    id="cin"
                    name="cin"
                    placeholder="01234567"
                    value={formData.cin}
                    onChange={handleChange}
                  />
                  {errors.cin && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.cin}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate">Birth Date</Label>
                <Input
                  value={formData.birthDate}
                  id="birthdate"
                  type="date"
                  onChange={handleChange}
                  name="birthDate"
                />
                {errors.birthDate && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.birthDate}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  name="gender"
                  onValueChange={handleGenderChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.gender}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  value={formData.address}
                  id="address"
                  onChange={handleChange}
                  name="address"
                  placeholder="123 Main St, Anytown USA"
                />
                {errors.address && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.address}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  defaultValue={formData.speciality}
                  id="specialty"
                  onChange={handleChange}
                  name="speciality"
                  placeholder="General"
                />
                {errors.speciality && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.speciality}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    defaultValue={formData.experience}
                    id="experience"
                    type="number"
                    onChange={handleChange}
                    name="experience"
                    placeholder="8"
                  />
                  {errors.experience && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.experience}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    defaultValue={formData.price}
                    id="price"
                    type="number"
                    onChange={handleChange}
                    name="price"
                    placeholder="70"
                  />
                  {errors.price && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.price}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  className="min-h-[100px]"
                  defaultValue={formData.bio}
                  id="bio"
                  onChange={handleChange}
                  name="bio"
                  placeholder="Doctor bio"
                />
                {errors.bio && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.bio}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto bg-darkblue min-w-40 ">
                Add Doctor
              </Button>
            </CardFooter>
          </Card>
        </form>
        <AlertModal
          open={showDialog}
          title="Doctor Added!"
          content="Doctor has been successfully Added."
          onClick={hideDialog}
          buttonTitle="Dismiss"
        />
      </>
    );
  };

  const Doctor = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState();
    const [doctorsCount, setDoctorsCount] = useState(78);
    const [loadingCount, setLoadingCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});
    const br = useRef();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const handleDelete = (index) => {
      changeDeleteIndex(index);
      toggleShowDeleteDialog();
    };
    const changeDeleteIndex = (index) => setDeleteIndex(index);
    const toggleShowDeleteDialog = () => setShowDeleteDialog((prev) => !prev);
    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleSearch = async (e) => {
      e.preventDefault();
      const count = await getDoctorssSearchCount(TOKEN, currentPage, search);
      if (count || count === 0) setDoctorsCount(count);
      const response = await getDoctors(TOKEN, currentPage, search);
      if (response) setData(response);
    };

    const fetchDoctors = async () => {
      const response = await getDoctors(TOKEN, currentPage, search);
      if (response) setData(response);
    };

    const fetchDoctorsCount = async () => {
      setLoadingCount(true);
      const response = await getDoctorsCount(TOKEN);
      if (response) setDoctorsCount(response);
      setLoadingCount(false);
    };

    useEffect(() => {
      fetchDoctorsCount();
    }, []);

    useEffect(() => {
      if (search != "") br.current.click();
    }, [currentPage]);

    useEffect(() => {
      if (search === "") {
        setCurrentPage(0);
        fetchDoctorsCount();
        fetchDoctors();
      }
    }, [search]);

    useEffect(() => {
      fetchDoctors();
    }, [currentPage]);

    const handlePrev = () => setCurrentPage((prev) => prev - 1);
    const handleNext = () => setCurrentPage((prev) => prev + 1);
    const handleEditClick = (index) => {
      navigate("./editDoctor", { state: data[index].id });
    };

    const deleteDoctor = async (index) => {
      const response = await deleteDoctorAdmin(TOKEN, data[index].id);
      if (response) {
        const updated = [...data];
        updated.splice(deleteIndex, 1);
        setData(updated);
        setDoctorsCount((prev) => prev - 1);
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
                placeholder="Search plans by name"
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
                  <p className="pl-5 text-white">Doctor Name</p>
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Email
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Speciality
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Number Of Patients
                </TableHead>
                <TableHead className="text-white place-content-center text-center pl-[50px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((doctor, index) => {
                return (
                  <TableRow className="grid grid-cols-5 pl-5" key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className=" h-14 w-14 text-darkblue">
                          <AvatarImage src={doctor.picture} />
                          <AvatarFallback className="uppercase">
                            {doctor.firstName[0]}
                            {doctor.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium capitalize">
                            {doctor.firstName} {doctor.lastName}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="flex justify-center items-center w-auto">
                      {doctor.email}
                    </TableCell>
                    <TableCell className="flex justify-center items-center w-auto pr-9">
                      {doctor.speciality}
                    </TableCell>
                    <TableCell className="flex justify-center items-center w-auto pr-12">
                      {doctor.numberOfPatients}
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
                  `${Math.min(currentPage * 5 + 1, doctorsCount)}-${Math.min(
                    (currentPage + 1) * 5,
                    doctorsCount
                  )} of ${doctorsCount}`
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

                {Math.min((currentPage + 1) * 5, doctorsCount) !=
                  doctorsCount && (
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
                This action cannot be undone. This will Delete this doctor
                permanently from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={toggleShowDeleteDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-700"
                onClick={() => deleteDoctor(index)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

  return (
    <div className="min-h">
      <div className="flex-1 transition-all duration-500 ease-in-out">
        <Tabs
          className=" items-center gap-0 transition-all duration-500 ease-in-out"
          defaultValue="doctors"
        >
          <TabsList className="gap-0 flex w-min">
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="doctors"
            >
              Doctors
            </TabsTrigger>
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="add-doctor"
            >
              Add Doctor
            </TabsTrigger>
          </TabsList>

          <main className="flex flex-1  flex-col flex-wrap gap-1 ">
            <TabsContent value="add-doctor">
              <AddDoctor />
            </TabsContent>
            <TabsContent value="doctors">
              <Doctor />
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
