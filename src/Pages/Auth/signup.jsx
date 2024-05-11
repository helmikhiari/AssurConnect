import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { validateDataCompany } from "../../assets/validation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function Signup() {
  const [accountType, setAccountType] = useState(null);
  const [currentForm, setCurrentForm] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleNext = () => setCurrentForm((prev) => prev + 1);
  const handleBack = () => setCurrentForm((prev) => prev - 1);

  const InitialForm = () => {
    const handleAccountTypeChange = (type) => setAccountType(type);
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="mt-2 text-gray-500">
            Choose the type of account you would like to create.
          </p>
        </div>

        <RadioGroup
          className="grid gap-4 text-[#272643]"
          name="account-type"
          onValueChange={handleAccountTypeChange}
          defaultValue={accountType}
        >
          <Label
            htmlFor="assurance"
            className="flex cursor-pointer items-center space-x-3 rounded-lg bg-gray-100 p-4 hover:bg-gray-200"
          >
            <RadioGroupItem id="assurance" value="Assurance" />
            <span className="text-lg font-medium flex-1 items-center">
              Assurance
            </span>
          </Label>
          <Label
            htmlFor="company"
            className="flex cursor-pointer items-center space-x-3 rounded-lg bg-gray-100 p-4 hover:bg-gray-200"
          >
            <RadioGroupItem id="company" value="Company" />
            <span className="text-lg font-medium flex-1 items-center">
              Company
            </span>
          </Label>
          <Label
            htmlFor="pharmacy"
            className="flex cursor-pointer items-center space-x-3 rounded-lg bg-gray-100 p-4 hover:bg-gray-200"
          >
            <RadioGroupItem id="pharmacy" value="Pharmacy" />
            <span className="text-lg font-medium flex-1 items-center">
              Pharmacy
            </span>
          </Label>
          <Label
            htmlFor="doctor"
            className="flex cursor-pointer items-center space-x-3 rounded-lg bg-gray-100 p-4 hover:bg-gray-200"
          >
            <RadioGroupItem id="doctor" value="Doctor" />
            <span className="text-lg font-medium flex-1 items-center">
              Doctor
            </span>
          </Label>
        </RadioGroup>
        <Button
          className="w-full rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b]"
          onClick={handleNext}
          disabled={accountType == null}
        >
          Next
        </Button>
      </div>
    );
  };

  const FormCompanyDoctor = () => {
    const [auxFormData, setAuxFormData] = useState({});

    const handleChange = (e) => {
      setAuxFormData({
        ...auxFormData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmitForm1 = () => {
      const validation = validateDataCompany(auxFormData, accountType);
      setErrors(validation);

      if (Object.keys(validation).length === 0) {
        setFormData({ ...auxFormData });
        handleNext();
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="mt-2 text-gray-500">
            {accountType == "Doctor" ? (
              <span>Enter your personal informations</span>
            ) : (
              <span>Enter your {accountType} informations</span>
            )}
          </p>
          <div className="text-lg font-medium py-2">
            {accountType} Informations
          </div>
        </div>

        <div>
          <div className="grid gap-4">
            {!(accountType === "Doctor") ? (
              <div className="space-y-2">
                <Label htmlFor="company-name" className="flex justify-start">
                  {accountType} Name*
                </Label>
                <Input
                  id="company-name"
                  name="companyName"
                  placeholder="DunDill"
                  required
                  value="dundill"
                  onChange={handleChange}
                />
                {errors.companyName && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.companyName}
                  </span>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="cin" className="flex justify-start">
                  CIN*
                </Label>
                <Input
                  id="cin"
                  name="cin"
                  placeholder="12345678"
                  required
                  value="12345678"
                  onChange={handleChange}
                />
                {errors.cin && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.cin}
                  </span>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex justify-start">
                Email*
              </Label>
              <Input
                name="email"
                id="email"
                placeholder="info@acme.com"
                required
                type="email"
                onChange={handleChange}
                value="hellmi.khiari@gmail.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm flex justify-start">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex justify-start">
                Password*
              </Label>
              <Input
                name="password"
                id="password"
                placeholder="********"
                required
                type="password"
                onChange={handleChange}
                value="1598521Az?"
              />
              {errors.password && (
                <span className="text-red-500 flex justify-start text-sm">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex justify-start">
                Confirm Password*
              </Label>
              <Input
                name="confirmPassword"
                id="confirmPassword"
                placeholder="********"
                required
                type="password"
                onChange={handleChange}
                value="1598521Az?"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 flex justify-start text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            className="w-1/2 rounded-lg bg-gray-100 py-3 font-medium text-[#272643] hover:bg-gray-200"
            variant="outline"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            onClick={handleSubmitForm1}
            className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b]"
          >
            Next
          </Button>
        </div>
      </div>
    );
  };
  const OtpForm = () => {
    const handleOtpChange = (value) => {
      setOtp(value);
    };
    const [otp, setOtp] = useState("");

    useEffect(() => {
      if (inputRef.current && otp.length == 5) {
        inputRef.current.blur();
      } else {
        inputRef.current.focus();
      }
    }, [otp]);
    const inputRef = useRef(null);
    const VerifyOtp = () => {};

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pt-10">
            Verify Your Email
          </h1>
          <p className="mt-2 text-gray-500 pt-4">
            Enter the 6-digit code sent to your email.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-center flex-wrap">
              <InputOTP
                maxLength={5}
                className="flex flex-wrap"
                onChange={handleOtpChange}
                value={otp}
                ref={inputRef}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex justify-between">
              <Button
                className="w-1/2 rounded-lg bg-gray-100 py-3 font-medium text-[#272643] hover:bg-gray-200"
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b]"
                onClick={handleNext}
              >
                Verify
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                className="w-full rounded-lg bg-gray-100 py-3 font-medium text-[#272643] hover:bg-gray-200"
                variant="outline"
                onClick={VerifyOtp}
              >
                Resend Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const CompleteProfileForm = () => {
    return (
      <div><p className="mt-2 text-gray-500 ">Complete Your Profile</p>
       <p className="text-lg text-left font-medium py-2 sm:text-md">
            Personal Informations
          </p>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
          <Label htmlFor="address" className="flex justify-start">
            Address*
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main St, Anytown USA"
            required
            // onChange={handleChange}
          />

          {errors.address && (
            <span className="text-red-500 flex justify-start text-sm">
              {errors.address}
            </span>
          )}
</div>  
<div className="space-y-2">
          <Label htmlFor="gender*" className="flex justify-start">
            Gender*
          </Label>
          <Select id="gender">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="apple">Male</SelectItem>
                <SelectItem value="banana">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
         
        </div>

        <p className="text-lg text-left font-medium py-2 sm:text-md mt-4">
          Professional Informations
          </p>
      <div className="grid gap-4  text-left">  
          
          <div className="space-y-2">
          <Label htmlFor="specialty">Speciality*</Label>
          <Input id="specialty" placeholder="Internal Medicine" required />
          </div>

          

          <div className="space-y-2">
          <Label htmlFor="experience">Experience</Label>
          <Input id="experience" placeholder="10" required type="number" />
          </div>
          <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="100" required type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">
            Bio*
          </Label>
          <Textarea
            name="bio"
            id="bio"
            placeholder="Tell us about your company"
            required
            // onChange={handleChange}
          />
          {errors.bio && (
            <span className="text-red-500 flex justify-start text-sm">
              {errors.bio}
            </span>
          )}
          </div>
          
        </div>
        <Button className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b] mt-3 w-full">
                  Finish
                </Button>
      </div>
    );
  };

  return (
    <div className="flex  w-full  justify-center pt-14 bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] to-white text-[#272643]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <Progress value={currentForm * 25} className="h-3" />
        <div className="text-sm text-gray-500 flex justify-end pb-2">
          Step {currentForm} of 4
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h1>
        <AnimatePresence>
          {currentForm === 1 && (
            <motion.div
              key="initialForm"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <InitialForm />
            </motion.div>
          )}

          {currentForm === 2 && (
            <motion.div
              key="formCompanyDoctor"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <FormCompanyDoctor />
            </motion.div>
          )}

          {currentForm === 3 && (
            <motion.div
              key="otpForm"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <OtpForm />
            </motion.div>
          )}
          {currentForm === 4 && (
            <motion.div
              key="completeProfile"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <CompleteProfileForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
