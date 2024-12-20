import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon } from "@radix-ui/themes/dist/cjs/index.js";
import { SearchIcon } from "../../../../assets/icons/icons";
import { FilterIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TabsTrigger, TabsList, Tabs, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { validateAddPlan } from "../../../../assets/validations";
import AlertModal from "../../../../components/alertModal";
import { addPlanAssurance, getAssurancePlans } from "../../../../assets/Apis/assets";
export default function Plans() {
  const TOKEN = localStorage.getItem("token");

  const AddPlan = () => {
    const [errors, setErrors] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
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
      console.log(validation);
      if (Object.keys(validation).length === 0) {
        const response = await addPlanAssurance(TOKEN, formData);
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
              {errors.error && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.error}
                </span>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto bg-darkblue min-w-40 ">
                Add Plan
              </Button>
            </CardFooter>
          </Card>
        </form>
        <AlertModal
          open={showDialog}
          title="Plan Added!"
          content="Your Plan has been successfully Added."
          onClick={hideDialog}
          buttonTitle="Dismiss"
        />
      </>
    );
  };

  const MyPlans = () => {
    const [filter, setFilter] = useState("Active");

    const handleChange = () => {
      setFilter((prev) => (prev === "Active" ? "Inactive" : "Active"));
    };
    const [data,setData]=useState([])

    const fetchData=async()=>
      {
        const response=await getAssurancePlans(TOKEN)
        console.log(response)
        if (response&&!response.error)
          setData(response)
              }
            
    useEffect(()=>{
      fetchData()
    },[])
const Plan=({data})=>
  { 
    return(
      <Card>
            <CardHeader>
              <CardTitle>{data.title} plan</CardTitle>
              <CardDescription>
                {data.bio}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Members Enrolled
                </span>
                <span className="text-2xl font-bold">{data.enrolledNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Purchases
                </span>
                <span className="text-2xl font-bold">{data.purchases}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-between">
              <Button variant="outline">View Details</Button>
              <Button>Manage Plan</Button>
            </CardFooter>
          </Card>
    )
  }


    return (
      <main className="flex-1 p-4 md:p-6 grid gap-4 md:gap-6">
        <div className="flex items-center gap-4">
          <form className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-10 w-full"
              placeholder="Search insurance plans..."
              type="search"
            />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                <FilterIcon className="w-5 h-5" />
                <span>Filter</span>
                <ChevronDownIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <div className="flex items-center justify-between">
                  <span>Active</span>
                  <Checkbox
                    checked={filter == "Active"}
                    onClick={handleChange}
                  />
                </div>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <div className="flex items-center justify-between">
                  <span>Inactive</span>
                  <Checkbox
                    checked={filter == "Inactive"}
                    onClick={handleChange}
                  />
                </div>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 md:gap-6">
          {data?.map((plan,index)=> <Plan data={plan} key={index}/>)}
          
        </div>
      </main>
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
              <MyPlans />
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
