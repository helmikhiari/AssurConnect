import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { Button } from "@/components/ui/button";
  import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
import AlertModal from "../../components/alertModal";
import { getAssuranceAdmin, updateAssuranceAdmin } from "../../assets/Apis/admin";
import { validateAddAssuranceAdmin, validateUpdateAssuranceAdmin } from "../../assets/validations";

  const updates = {};
  export default function EditAssurance() {
    const location = useLocation();
    const assuranceID = location.state;
   
    const TOKEN=localStorage.getItem('token');
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [formData,setFormData]=useState();
    const fetchData=async()=>
      {
        const response=await getAssuranceAdmin(TOKEN,assuranceID);
        if (response)
          setFormData(response);
      }

    useEffect(()=>{
      fetchData()
    },[])

    const handleCancel = () => {
      navigate("../assurances");
    };
  
    const hideDialog = () => {
      setShowDialog(false);
      navigate("../assurances");
    };
  
    const handleChange = (e) => {
      if (formData[e.target.name] == e.target.value) {
        delete updates[e.target.name];
      } else {
        updates[e.target.name] = e.target.value;
      }
      setDisabled(Object.keys(updates).length === 0);
    };
  
    const saveChanges = async () => {
      console.log(updates)
      const validation = validateUpdateAssuranceAdmin(updates);
      if (Object.keys(validation).length === 0) {
        const token = localStorage.getItem("token");
        const response = await updateAssuranceAdmin(token, assuranceID,updates);
        if (response === true) {
          setShowDialog(true);
        }
      } else {
        setErrors(validation);
      }
    };
  
    return (
      <main className=" mx-auto my-8 px-4 md:px-6">
        <Card className="shadow-md hover:shadow-xl text-left rounded-2xl transistion-shadow duration-500 drop-shadow-md">
          <CardHeader className="bg-darkblue text-white rounded-t-2xl  mb-5 pl-10">
            <CardTitle>Edit Assurance</CardTitle>
            <CardDescription>Update the assurance information.</CardDescription>
          </CardHeader>
  
       
            <div className="flex items-center gap-4 mb-5">
              <Avatar className="h-14 w-14 ml-8" >
                <AvatarImage alt="@username" src={formData?.logo} />
                <AvatarFallback className="font-med">JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-sm ">
                <div className="font-medium text-center pb-1">Star</div>
                
              </div>
            </div>
            <CardContent className="grid gap-6">
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Assurance Name</Label>
                  <Input
                    id="name"
                    placeholder="DunDill"
                    defaultValue={formData?.name}
                    onChange={handleChange}
                    name="name"
                  />
                  {errors.assuranceName && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.assuranceName}
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
                    defaultValue={formData?.email}
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
              defaultValue={formData?.address}
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
            <Label htmlFor="bio">Bio</Label>
            <Input
              defaultValue={formData?.bio}
              id="bio"
              onChange={handleChange}
              name="bio"
              placeholder="123 Main St, Anytown USA"
            />
            {errors.bio && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.bio}
              </span>
            )}
          </div>
        
          
          <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="founded">Founded</Label>
            <Input
              
              defaultValue={formData?.founded}
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
              
              defaultValue={formData?.taxNumber}
              id="code-tax"
              onChange={handleChange}
              name="codeTax"
              placeholder="0123456789"
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
              defaultValue={formData?.description}
              id="description"
              onChange={handleChange}
              name="description"
              placeholder="assurance Description"
            />
            {errors.description && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.description}
              </span>
            )}
        </div>
            </CardContent>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pr-14">
            <Button
              variant="destructive"
              className="w-[100px]"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-darkblue w-[100px]"
              disabled={disabled}
              onClick={saveChanges}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
        <AlertModal
          open={showDialog}
          title="Assurance Updated!"
          content="Assurance has been successfully updated."
          onClick={hideDialog}
          buttonTitle="Dismiss"
        />
      </main>
    );
  }
  