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
import { getDoctorAdmin, updateDoctorAdmin } from "../../assets/Apis/admin";
import { stringToDate, stringToDateBar } from "../../assets/functions";
import { validateUpdateDoctorAdmin } from "../../assets/validations";

const updates = {};
export default function EditDoctor() {
  const location = useLocation();
  const doctorID = location.state;
  const TOKEN = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: "" });
  const [gender, setGender] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const handleCancel = () => {
    navigate("../doctors");
  };

  const hideDialog = () => {
    setShowDialog(false);
    navigate("../doctors");
  };
  const fetchData = async () => {
    const response = await getDoctorAdmin(TOKEN, doctorID);
    console.log(response)
    if (response) {
      if (response.birthDate)
        response.birthDate = stringToDate(response.birthDate);
      setFormData(response);
    }
  };
  const handleChange = (e) => {
    if (formData[e.target.name] == e.target.value) {
      delete updates[e.target.name];
    } else {
      updates[e.target.name] = e.target.value;
    }
    setDisabled(Object.keys(updates).length === 0);
  };

  const handleGenderChange = (value) => {
    setGender(value);
    if (formData["gender"] == value) {
      delete updates["gender"];
    } else {
      updates["gender"] = value;
    }
    setDisabled(Object.keys(updates).length === 0);
  };

  const saveChanges = async () => {
      const validation = validateUpdateDoctorAdmin(updates);
      if (Object.keys(validation).length === 0) {
        const response = await updateDoctorAdmin(TOKEN, doctorID,updates );
        if (response === true) {
          setShowDialog(true);
        }
      } else {
        setErrors(validation);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className=" mx-auto my-8 px-4 md:px-6">
      <Card className="shadow-md hover:shadow-xl text-left rounded-2xl transistion-shadow duration-500 drop-shadow-md">
        <CardHeader className="bg-darkblue text-white rounded-t-2xl  mb-5 pl-10">
          <CardTitle>Edit Doctor</CardTitle>
          <CardDescription>Update the doctor's information.</CardDescription>
        </CardHeader>

        <div className="flex items-center gap-4 mb-5">
          <Avatar className="h-20 w-20 ml-8">
            <AvatarImage alt="@username" src={formData?.picture} />
            <AvatarFallback className="font-med">{formData?.firstName?.[0]}{formData?.lastName?.[0]}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-sm ">
            <div className="font-medium text-center pb-1">
              {formData.firstName} {formData.lastName}
            </div>
          </div>
        </div>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Enter doctor last name"
                defaultValue={formData.lastName}
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
                defaultValue={formData.firstName}
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
                defaultValue={formData.email}
                onChange={handleChange}
              />
              {errors.price && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.price}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cin">CIN</Label>
              <Input
                id="cin"
                name="cin"
                placeholder="01234567"
                defaultValue={formData.cin}
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
              defaultValue={formData.birthDate}
              id="birthdate"
              type="date"
              onChange={handleChange}
              name="birthDate"
            />
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
        title="Doctor Updated!"
        content="Doctor been successfully updated."
        onClick={hideDialog}
        buttonTitle="Dismiss"
      />
    </main>
  );
}
