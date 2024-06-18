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
  validateAddCompanyAdmin,
  validateAddPlan,
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
import { addCompanyAdmin, deleteCompanyAdmin, getCompanies, getCompaniesCount, getCompaniesSearchCount } from "../../assets/Apis/admin";

export default function Companies() {
  const TOKEN = localStorage.getItem("token");

  const AddCompany = () => {
    const [errors, setErrors] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      founded: "",
      taxNumber: "",
      description: "",
    });

    const hideDialog = () => setShowDialog(false);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const addCompanyy = async (e) => {
      e.preventDefault();
      setButtonDisabled(true);
      const validation = validateAddCompanyAdmin(formData,"company");
      if (Object.keys(validation).length === 0) {
        const response = await addCompanyAdmin(TOKEN, formData);
        if (response && !response.error) {
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

    return (
      <>
        <form className="flex justify-center text-left" onSubmit={addCompanyy}>
          <Card className="w-full max-w-4xl drop-shadow-xl rounded-t-2xl">
            <CardHeader className="bg-darkblue text-white rounded-t-2xl mb-5">
              <CardTitle>Add A Company</CardTitle>
              <CardDescription>
                Fill out the details to add a company.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    placeholder="DunDill"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                  />
                  {errors.name && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.name}
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
                  {errors.password && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  defaultValue={formData.address}
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

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="founded">Founded</Label>
                  <Input
                    id="founded"
                    type="number"
                    onChange={handleChange}
                    name="founded"
                    placeholder="1950"
                  />
                  {errors.founded && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.founded}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code-tax">Tax Code</Label>
                  <Input
                    id="code-tax"
                    onChange={handleChange}
                    name="taxNumber"
                    placeholder="012345678"
                  />
                  {errors.taxNumber && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.taxNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="min-h-[100px]"
                  defaultValue={formData.description}
                  id="description"
                  onChange={handleChange}
                  name="description"
                  placeholder="Company Description"
                />
                {errors.description && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.description}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="ml-auto bg-darkblue min-w-40 "
                disabled={buttonDisabled}
              >
                Add Company
              </Button>
            </CardFooter>
          </Card>
        </form>
        <AlertModal
          open={showDialog}
          title="Company Added!"
          content="Company has been successfully Added."
          onClick={hideDialog}
          buttonTitle="Dismiss"
        />
      </>
    );
  };

  const Company = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState();
    const [companiesCount, setCompaniesCount] = useState(78);
    const [loadingCount, setLoadingCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});
    const br = useRef();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const handlePrev = () => setCurrentPage((prev) => prev - 1);
    const handleNext = () => setCurrentPage((prev) => prev + 1);
    const changeDeleteIndex = (index) => setDeleteIndex(index);
    const toggleShowDeleteDialog = () => setShowDeleteDialog((prev) => !prev);
    const handleDelete = (index) => {
      changeDeleteIndex(index);
      toggleShowDeleteDialog();
    };

    const deleteCompany=async()=>
      {
        const response=await deleteCompanyAdmin(TOKEN,data[deleteIndex].id)
        if (response)
          {
            const updated=[...data]
          updated.splice(deleteIndex,1)
          setData(updated);
          setCompaniesCount((prev)=>prev-1);
          toggleShowDeleteDialog()
          }
      }

    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleSearch = async (e) => {
      e.preventDefault();
      const count = await getCompaniesSearchCount(TOKEN, currentPage, search);
      console.log(count)
      if (count||count===0) setCompaniesCount(count);
      const response = await getCompanies(TOKEN, currentPage, search);
      if (response) setData(response);
    };

    useEffect(() => {
      if (search != "") br.current.click();
    }, [currentPage]);

    const fetchCompaniesCount = async () => {
      setLoadingCount(true);
      const response = await getCompaniesCount(TOKEN);
      if (response) setCompaniesCount(response);
      setLoadingCount(false);
    };

    const fetchCompanies = async () => {
      const response = await getCompanies(TOKEN, currentPage, search);
      if (response) setData(response);
    };

    useEffect(() => {
      if (search === "") {
        setCurrentPage(0);
        fetchCompaniesCount();
        fetchCompanies();
      }
    }, [search]);

    useEffect(() => {
      fetchCompanies();
    }, [currentPage]);

    
    const handleEditClick = (index) => {
      navigate("./editCompany",{state:data[index].id});
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
                  <p className="pl-5 text-white">Company</p>
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Email
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Founded
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Number Of Employees
                </TableHead>
                <TableHead className="text-white place-content-center text-center pl-[50px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((company, index) => {
                return (
                  <TableRow className="grid grid-cols-5 pl-5" key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className=" h-14 w-14 text-darkblue">
                          <AvatarImage src={company.logo} />
                          <AvatarFallback className="uppercase">
                            {company.name[0]}
                            {company.name[1]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium capitalize">
                            {company.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="flex justify-center items-center w-auto">
                      {company.email}
                    </TableCell>
                    <TableCell className="flex justify-center items-center w-auto pr-12">
                      {company.founded}
                    </TableCell>
                    <TableCell className="flex justify-center items-center w-auto pr-12">
                      {company.numberOfEmployees}
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
                  `${Math.min(currentPage * 5 + 1, companiesCount)}-${Math.min(
                    (currentPage + 1) * 5,
                    companiesCount
                  )} of ${companiesCount}`
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

                {Math.min((currentPage + 1) * 5, companiesCount) !=
                  companiesCount && (
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
                This action cannot be undone. This will Delete this company
                permanently from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={toggleShowDeleteDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-700"
                onClick={deleteCompany}
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
          defaultValue="company"
        >
          <TabsList className="gap-0 flex w-min">
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="company"
            >
              Companies
            </TabsTrigger>
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="add-company"
            >
              Add Company
            </TabsTrigger>
          </TabsList>

          <main className="flex flex-1  flex-col flex-wrap gap-1 ">
            <TabsContent value="add-company">
              <AddCompany />
            </TabsContent>
            <TabsContent value="company">
              <Company />
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
