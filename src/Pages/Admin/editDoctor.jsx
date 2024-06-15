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
  import { useState } from "react";
import AlertModal from "../../components/alertModal";

  const updates = {};
  export default function EditDoctor() {
    const location = useLocation();
    const navigate = useNavigate();
const [formData,setFormData]=useState({})
    // location.state.birthDate = formatDateToYYYYMMDD(location.state.birthDate);
    const doctor = location.state;
    const [gender, setGender] = useState();
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
      if (doctor[e.target.name] == e.target.value) {
        delete updates[e.target.name];
      } else {
        updates[e.target.name] = e.target.value;
      }
      setDisabled(Object.keys(updates).length === 0);
    };
  
    const handleGenderChange = (value) => {
      setGender(value);
      if (doctor["gender"] == value) {
        delete updates["gender"];
      } else {
        updates["gender"] = value;
      }
      setDisabled(Object.keys(updates).length === 0);
    };
  
    const saveChanges = async () => {
    //   const validation = validateUpdateEmp(updates);
    //   if (Object.keys(validation).length === 0) {
    //     const token = localStorage.getItem("token");
    //     const response = await updateEmployee(token, updates, emp.id);
    //     if (response === true) {
    //       setShowDialog(true);
    //     }
    //   } else {
    //     setErrors(validation);
    //   }
    };
  
    return (
      <main className=" mx-auto my-8 px-4 md:px-6">
        <Card className="shadow-md hover:shadow-xl text-left rounded-2xl transistion-shadow duration-500 drop-shadow-md">
          <CardHeader className="bg-darkblue text-white rounded-t-2xl  mb-5 pl-10">
            <CardTitle>Edit Doctor</CardTitle>
            <CardDescription>Update the doctor's information.</CardDescription>
          </CardHeader>
  
       
            <div className="flex items-center gap-4 mb-5">
              <Avatar className="h-14 w-14 ml-8" >
                <AvatarImage alt="@username" src={doctor?.picture} />
                <AvatarFallback className="font-med">JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-sm ">
                <div className="font-medium text-center pb-1">Helmi Khiari</div>
                
              </div>
            </div>
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
                    value={formData.cin}
                    onChange={handleChange}
                  />
                  {errors.duration && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.duration}
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
          title="Employee Updated!"
          content="Your Employee has been successfully updated."
          onClick={hideDialog}
          buttonTitle="Dismiss"
        />
      </main>
    );
  }
  