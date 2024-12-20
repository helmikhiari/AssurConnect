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
import { validateAddPlan } from "../../assets/validations";
import { addPlanAssurance, getPlansByPageandSearch } from "../../assets/Apis/assets";
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
import { addPlanAdmin, getAllAssurances, getPharmaciesCount, getPlans, getPlansCount } from "../../assets/Apis/admin";

export default function AdminPlans() {
  const TOKEN = localStorage.getItem("token");

  const AddPlan = () => {
    const [errors, setErrors] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [assurances,setAssurances]=useState([])
    const [assuranceID,setAssuranceID]=useState();
    const [formData, setFormData] = useState({
      title: "",
      bio: "",
      description: "",
      price: "",
      duration: "",
      cover: "",
      termsAndConditions: "",
      coverageDetails: "",
      exclusions: "",
      numberOfUsers: "",
    });

    const hideDialog = () => setShowDialog(false);
    const changeAssuranceID=(e)=>setAssuranceID(e)
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const addPlan = async (e) => {
      e.preventDefault();
      setButtonDisabled(true);
      const validation = validateAddPlan(formData);
      if (Object.keys(validation).length === 0) {
        const response = await addPlanAdmin(TOKEN, formData,assuranceID);
        if (response && !response.name) {
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

    const fetchAssurances=async()=>
      {
        const response=await getAllAssurances(TOKEN)
        if (response)
          setAssurances(response)
      }

    
      useEffect(()=>{
        fetchAssurances();
      },[])


    return (
      <>
        <form className="flex justify-center text-left" onSubmit={addPlan}>
          <Card className="w-full max-w-4xl drop-shadow-xl rounded-t-2xl">
            <CardHeader className="bg-darkblue text-white rounded-t-2xl mb-5">
              <CardTitle>Create New Insurance Plan</CardTitle>
              <CardDescription>
                Fill out the details for your new insurance plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter plan title"
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                  />
                  {errors.title && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.title}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    placeholder="Enter plan bio"
                    value={formData.bio}
                    onChange={handleChange}
                    name="bio"
                  />
                  {errors.bio && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.bio}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter plan description"
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.description}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Enter plan price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.price}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    placeholder="Enter plan duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  {errors.duration && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.duration}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover">Cover</Label>
                  <Input
                    id="cover"
                    name="cover"
                    type="number"
                    placeholder="Enter plan cover"
                    value={formData.cover}
                    onChange={handleChange}
                  />
                  {errors.cover && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.cover}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms">Terms and Conditions</Label>
                <Textarea
                  id="terms"
                  name="termsAndConditions"
                  placeholder="Enter plan terms and conditions"
                  className="min-h-[120px]"
                  value={formData.termsAndConditions}
                  onChange={handleChange}
                />
                {errors.termsAndConditions && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.termsAndConditions}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverage">Coverage Details</Label>
                <Textarea
                  id="coverage"
                  name="coverageDetails"
                  placeholder="Enter plan coverage details"
                  className="min-h-[120px]"
                  value={formData.coverageDetails}
                  onChange={handleChange}
                />
                {errors.coverageDetails && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.coverageDetails}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="exclusions">Exclusions</Label>
                <Textarea
                  id="exclusions"
                  name="exclusions"
                  placeholder="Enter plan exclusions"
                  className="min-h-[120px]"
                  value={formData.exclusions}
                  onChange={handleChange}
                />
                {errors.exclusions && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.exclusions}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="users">Number of Users</Label>
                <Input
                  id="users"
                  type="number"
                  name="numberOfUsers"
                  placeholder="Enter number of users"
                  value={formData.numberOfUsers}
                  onChange={handleChange}
                />
                {errors.numberOfUsers && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.numberOfUsers}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="assurance">Assurance Plan Owner</Label>
                <Select id="assurance" onValueChange={changeAssuranceID}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an Assurance Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {assurances.map((assurance,index)=><SelectItem key={index} value={assurance._id}>{assurance.name}</SelectItem>)}
                    
                  </SelectContent>
                </Select>
                {errors.assurance && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.assurance}
                  </span>
                )}
              </div>
              {errors.error && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.error}
                </span>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto bg-darkblue min-w-40 " disabled={buttonDisabled}>
                Add Plan
              </Button>
            </CardFooter>
          </Card>
        </form>
        <AlertModal
          open={showDialog}
          title="Plan Added!"
          content="Plan has been successfully Added."
          onClick={hideDialog}
          buttonTitle="Dismiss"
        />
      </>
    );
  };

  const Plans = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState();
    const changeDeleteIndex = (index) => setDeleteIndex(index);
    const toggleShowDeleteDialog = () => setShowDeleteDialog((prev) => !prev);
    const [plansCount, setplansCount] = useState();
    const [loadingCount, setLoadingCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});
    const br = useRef();
    const [data, setData] = useState()
    const handleDelete = (index) => {
      changeDeleteIndex(index);
      toggleShowDeleteDialog();
    };

    const handleSearchChange = (e) => setSearch(e.target.value);
    const handlePrev = () => setCurrentPage((prev) => prev - 1);
    const handleNext = () => setCurrentPage((prev) => prev + 1);

    const handleSearch = async (e) => {
      e.preventDefault();
      const count = await getPlansSearchCount(TOKEN, currentPage, search);
      if (count || count === 0) setplansCount(count);
      const response = await getPla(TOKEN, currentPage, search);
      if (response) setData(response);
    };

    const fetchPlansCount = async () => {
      setLoadingCount(true);
      const response = await getPlansCount(TOKEN);
      if (response) setplansCount(response);
      setLoadingCount(false);
    };

    const fetchPlans = async () => {
      const response = await getPlans(TOKEN, currentPage, search);
      if (response) setData(response);
    };

    useEffect(() => {
      if (search != "") br.current.click();
    }, [currentPage]);

    useEffect(() => {
      if (search === "") {
        setCurrentPage(0);
        fetchPlansCount();
        fetchPlans();
      }
    }, [search]);

    useEffect(() => {
      fetchPlans();
    }, [currentPage]);

   

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
              <TableRow className="grid grid-cols-4 bg-darkblue hover:bg-darkblue text-white rounded-t-xl px-10 ">
                <TableHead className="text-left place-content-center">
                  <p className="pl-5 text-white">Assurance Company</p>
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                Plan Title
                </TableHead>
                <TableHead className="text-white place-content-center text-center">
                  Sells
                </TableHead>

                <TableHead className="text-white place-content-center text-center pl-[50px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((plan, index) => {
                return (
                  <TableRow className="grid grid-cols-4 pl-5" key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className=" h-14 w-14 text-darkblue">
                          <AvatarImage src={plan?.assuranceLogo} />
                          <AvatarFallback className="uppercase">
                            {plan.assuranceName?.[0]}
                            {plan.assuranceName?.[1]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium capitalize">
                            {plan.assuranceName}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="flex justify-center items-center w-auto">
                      {plan.title}
                    </TableCell>
                    <TableCell className="flex justify-center items-center w-auto pr-12">
                      {plan.numberOfPurchases}
                    </TableCell>

                    <TableCell className="flex items-center justify-end w-auto gap-5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-darkblue text-white hover:bg-black hover:text-white"
                        onClick={() => handleEditClick(index)}
                      >
                        Details
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(index)}
                      >
                        Deactivate
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
                  `${Math.min(currentPage * 5 + 1, plansCount)}-${Math.min(
                    (currentPage + 1) * 5,
                    plansCount
                  )} of ${plansCount}`
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

                {Math.min((currentPage + 1) * 5, plansCount) != plansCount && (
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
                This action cannot be undone. This will Deactivate this plan ,it
                will be unavailable for companies to buy it
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={toggleShowDeleteDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-700"
                // onClick={deleteEmp}
              >
                Deactivate
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
          defaultValue="my-plans"
        >
          <TabsList className="gap-0 flex w-min">
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="my-plans"
            >
              Plans
            </TabsTrigger>
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="add-plan"
            >
              Add Plan
            </TabsTrigger>
          </TabsList>

          <main className="flex flex-1  flex-col flex-wrap gap-1 ">
            <TabsContent value="add-plan">
              <AddPlan />
            </TabsContent>
            <TabsContent value="my-plans">
              <Plans />
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
