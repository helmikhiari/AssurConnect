import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
  } from "@/components/ui/select";
  import { Button } from "@/components/ui/button";
  import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import AlertModal from "../../components/alertModal";
import { getPharmacyAdmin, updatePharmacyAdmin } from "../../assets/Apis/admin";
import { validateUpdateAssuranceAdmin } from "../../assets/validations";

  
  const updates = {};
  export default function EditPharmacy() {
    const location = useLocation();
    const TOKEN=localStorage.getItem('token');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const pharmacyID = location.state;
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const handleCancel = () => {
      navigate("../pharmacies");
    };
  
    const hideDialog = () => {
      setShowDialog(false);
      navigate("../pharmacies");
    };
  
    const handleChange = (e) => {
      if (formData[e.target.name] == e.target.value) {
        delete updates[e.target.name];
      } else {
        updates[e.target.name] = e.target.value;
      }
      setDisabled(Object.keys(updates).length === 0);
    };
  
    const fetchData=async()=>
      {
        const response=await getPharmacyAdmin(TOKEN,pharmacyID);
        if (response)
          setFormData(response)
        console.log(response)
        
      }
  
    const saveChanges = async () => {
        const validation = validateUpdateAssuranceAdmin(updates,"pharmacy");
        if (Object.keys(validation).length === 0) {
          const response = await updatePharmacyAdmin(TOKEN,pharmacyID, updates);
          if (response) {
            setShowDialog(true);
          }
        } else {
          setErrors(validation);
        }
    };
  
    useEffect(()=>{
      fetchData()
    },[])
  
    return (
      <main className=" mx-auto my-8 px-4 md:px-6">
        <Card className="shadow-md hover:shadow-xl text-left rounded-2xl transistion-shadow duration-500 drop-shadow-md">
          <CardHeader className="bg-darkblue text-white rounded-t-2xl  mb-5 pl-10">
            <CardTitle>Edit Pharmacy</CardTitle>
            <CardDescription>Update the pharmacy information.</CardDescription>
          </CardHeader>
  
          <div className="flex items-center gap-4 mb-5">
            <Avatar className="h-14 w-14 ml-8">
              <AvatarImage alt="@username" src={formData?.logo} />
              <AvatarFallback className="font-med">{formData?.name?.[0]}{formData?.name?.[1]}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-sm ">
              <div className="font-medium text-center pb-1">{formData?.name }</div>
            </div>
          </div>
          <CardContent className="grid gap-6">
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Pharmacy Name</Label>
                  <Input
                    id="name"
                    placeholder="DunDill"
                    defaultValue={formData.name}
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
                    defaultValue={formData.email}
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
                    defaultValue={formData.founded}
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
                    defaultValue={formData.taxNumber}
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
                  placeholder="Pharmacy Description"
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
          title="Pharmacy Updated!"
          content="Pharmacy has been successfully updated."
          onClick={hideDialog}
          buttonTitle="Dismiss"
        />
      </main>
    );
  }
  