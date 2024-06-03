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
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { stringToDate } from "../../../assets/functions";

import { validateEditProfileDoctor } from "../../../assets/validations";
import { updateDoctor } from "../../../assets/Apis/assets";
import AlertModal from "./../../../components/alertModal";
///birthdate dto backend signup correction
const updates = {};
export default function DoctorProfile({ profile }) {
  const birthDate = stringToDate(profile.birthDate);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const hideDialog = () => {
    setShowDialog(false);
    window.location.reload();
  };

  const handleChange = (e) => {
    if (profile[e.target.name] == e.target.value) {
      delete updates[e.target.name];
    } else {
      updates[e.target.name] = e.target.value;
    }
    setDisabled(Object.keys(updates).length === 0);
  };

  const handleGenderChange = (e) => {
    if (profile.gender !== e) updates["gender"] = e;
    else delete updates.gender;
    setDisabled(Object.keys(updates).length === 0);
  };

  const saveChanges = async () => {
    console.log(updates);
    const validation = validateEditProfileDoctor(updates);
    setErrors(validation);
    console.log(validation);
    if (Object.keys(validation).length === 0) {
      const token = localStorage.getItem("token");
      const response = await updateDoctor(updates, token);
      if (response === true) {
        setShowDialog(true);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-[110px] w-[110px]">
            <AvatarImage src={profile.picture} />
            <AvatarFallback>
              {profile.firstName[0] + profile.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              Dr. {profile.firstName + " " + profile.lastName}
            </h2>
            <p className="text-gray-500 text-left">{profile.speciality}</p>
          </div>
        </div>
        <Button variant="outline">Change Image Profile</Button>
      </div>
      <Card
        Card
        className="shadow-md hover:shadow-xl text-left rounded-2xl transistion-shadow duration-500 drop-shadow-md"
      >
        <CardHeader className="bg-darkblue text-white rounded-t-2xl  mb-5 pl-10">
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              defaultValue={profile.email}
              id="email"
              type="email"
              disabled
              name="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cin">CIN</Label>
            <Input
              defaultValue={profile.cin}
              id="cin"
              disabled
              name="cin"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              defaultValue={profile.lastName}
              id="last-name"
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
              defaultValue={profile.firstName}
              id="first-name"
              name="firstName"
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.firstName}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birth Date</Label>
            <Input
              defaultValue={birthDate}
              id="birthdate"
              type="date"
              onChange={handleChange}
              name="birthDate"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              defaultValue={profile.gender}
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              defaultValue={profile.address}
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
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              defaultValue={profile.speciality}
              id="specialty"
              onChange={handleChange}
              name="speciality"
            />
            {errors.speciality && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.speciality}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Input
              defaultValue={profile.experience}
              id="experience"
              type="number"
              onChange={handleChange}
              name="experience"
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
              defaultValue={profile.price}
              id="price"
              type="number"
              onChange={handleChange}
              name="price"
            />
            {errors.price && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.price}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              className="min-h-[100px]"
              defaultValue={profile.bio}
              id="bio"
              onChange={handleChange}
              name="bio"
            />
            {errors.bio && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.bio}
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
