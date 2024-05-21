import React,{useState} from "react";
import { Textarea } from "@/components/ui/textarea";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import AlertModal from "../../../components/alertModal";
import { validateEditProfileCompany } from "../../../assets/validations";
import { updateCompany } from "../../../assets/Apis/assets";

const updates={}
export default function CompanyProfile({profile}) {
    const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const hideDialog = () => {
    setShowDialog(false);
    window.location.reload();
  };

  const handleChange = (e) => {
    if (profile.data[e.target.name] == e.target.value) {
      delete updates[e.target.name];
    } else {
      updates[e.target.name] = e.target.value;
    }
    setDisabled(Object.keys(updates).length === 0);
  };

  const saveChanges = async () => {
    console.log(updates);
    const validation = validateEditProfileCompany(updates);
    setErrors(validation);
    console.log(validation);
    if (Object.keys(validation).length === 0) {
      const token = localStorage.getItem("token");
      const response = await updateCompany(updates, token,profile.role);
      if (response === true) {
        setShowDialog(true);
      }
    }
  };

  return(
    
        <>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="elj" />
                <AvatarFallback>
                  {profile.data.name[0]+profile.data.name[1]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">
                  {profile.data.name}
                </h2>
                <p className="text-gray-500 text-left pl-3">
                  {profile.role}
                </p>
              </div>
            </div>
            <Button variant="outline">Change Logo</Button>
          </div>
          <Card className="shadow text-left">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  defaultValue={profile.data.email}
                  id="email"
                  type="email"
                  disabled
                  name="email"
                />
              </div>
              
    
              <div className="space-y-2">
                <Label htmlFor="name">{profile.role} Name</Label>
                <Input
                  defaultValue={profile.data.name}
                  id="name"
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
                <Label htmlFor="address">Address</Label>
                <Input
                  defaultValue={profile.data.address}
                  id="address"
                  onChange={handleChange}
                  name="address"
                />
                {errors.address && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.address}
                  </span>
                )}
              </div>
             
    
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="min-h-[100px]"
                  defaultValue={profile.data.bio}
                  id="description"
                  onChange={handleChange}
                  name="description"
                />
                {errors.description && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.description}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pr-12">
              <Button
                className="bg-darkblue"
                disabled={disabled}
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          <AlertModal
            open={showDialog}
            title="Profile Updated!"
            content="Your profile has been successfully updated."
            onClick={hideDialog}
            buttonTitle="Dismiss"
          />
        </>
      );

}


