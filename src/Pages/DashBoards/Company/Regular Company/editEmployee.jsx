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
import { useState } from "react";
import { formatDateToYYYYMMDD } from "../../../../assets/functions";
import { validateUpdateEmp } from "../../../../assets/validations";
import { updateEmployee } from "../../../../assets/Apis/assets";
import AlertModal from "../../../../components/alertModal";
const updates = {};
export default function EditEmployee() {
  const location = useLocation();
  const navigate = useNavigate();

  location.state.birthDate = formatDateToYYYYMMDD(location.state.birthDate);
  const emp = location.state;
  const [gender, setGender] = useState(location.state.gender);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const handleCancel = () => {
    navigate("../employees");
  };

  const hideDialog = () => {
    setShowDialog(false);
    navigate("../employees");
  };

  const handleChange = (e) => {
    if (emp[e.target.name] == e.target.value) {
      delete updates[e.target.name];
    } else {
      updates[e.target.name] = e.target.value;
    }
    setDisabled(Object.keys(updates).length === 0);
  };

  const handleGenderChange = (value) => {
    setGender(value);
    if (emp["gender"] == value) {
      delete updates["gender"];
    } else {
      updates["gender"] = value;
    }
    setDisabled(Object.keys(updates).length === 0);
  };

  const saveChanges = async () => {
    const validation = validateUpdateEmp(updates);
    if (Object.keys(validation).length === 0) {
      const token = localStorage.getItem("token");
      const response = await updateEmployee(token, updates, emp.id);
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
          <CardTitle>Edit Employee</CardTitle>
          <CardDescription>Update the employee's information.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage alt="@username" src={emp?.picture} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-sm ">
              <div className="font-medium text-center pb-1">Helmi Khiari</div>
              <Badge> No Active Plan</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                name="firstName"
                placeholder="Enter employee first name"
                defaultValue={emp?.firstName}
                className="capitalize"
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.firstName}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                name="lastName"
                placeholder="Enter employee last name"
                defaultValue={emp?.lastName}
                className="capitalize"
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cin">CIN</Label>
              <Input id="cin" value={emp?.cin} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthdate">Birthdate</Label>
              <Input
                id="birthdate"
                name="birthDate"
                placeholder="jj/mm/aaaa"
                type="date"
                defaultValue={emp?.birthDate}
                onChange={handleChange}
              />
              {errors.birthDate && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.birthDate}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                id="gender"
                value={gender}
                onValueChange={handleGenderChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                name="jobTitle"
                placeholder="Enter job title"
                defaultValue={emp?.jobTitle}
                onChange={handleChange}
              />
              {errors.jobTitle && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.jobTitle}
                </span>
              )}
            </div>
          </div>
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
        title="Employee Updated!"
        content="Your Employee has been successfully updated."
        onClick={hideDialog}
        buttonTitle="Dismiss"
      />
    </main>
  );
}
