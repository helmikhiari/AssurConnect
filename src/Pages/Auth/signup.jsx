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
import { validateForm1 } from "./../../assets/signup";
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

  const handleNext = () => setCurrentForm((prev) => prev + 1);
  const handleBack = () => setCurrentForm((prev) => prev - 1);

  const InitialForm = () => {
    const handleAccountTypeChange = (type) => setAccountType(type);
    return (
      <>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h1>
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
      </>
    );
  };

  const FormCompanyDoctor = () => {
    ////mochkla :contenu ta3 el input yetfasa5
    const [auxFormData, setAuxFormData] = useState({});

    const handleChange = (e) => {
      setAuxFormData({
        ...auxFormData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmitForm1 = () => {
      const validation = validateForm1(auxFormData, accountType);
      setErrors(validation);

      if (Object.keys(validation).length === 0) {
        setFormData({ ...auxFormData });
        handleNext();
      }
    };

    return (
      <>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h1>
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
                    value={auxFormData.cin}
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
      </>
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
      <>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Verify Your Email
        </h1>
        <div className="space-y-6">
          <div className="text-center">
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
      </>
    );
  };

  const CompleteProfileFormDoctor = () => {
    const [auxFormData, setAuxFormData] = useState({});
    const handleChange = (e) => {
      setAuxFormData({
        ...auxFormData,
        [e.target.name]: e.target.value,
      });
    };

    const handleGenderChange = (e) => {
      setAuxFormData({
        ...auxFormData,
        gender: e,
      });
    };

    const handleSubmitForm2 = () => {
      console.log(auxFormData);
      const validation = validateForm1(auxFormData, accountType);
      setErrors(validation);

      if (Object.keys(validation).length === 0) {
        setFormData({ ...auxFormData });
        handleNext();
      }
    };

    return (
      <>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Complete Your Profile
        </h1>
        <div>
          <p className="mt-2 text-gray-500 ">
            Add both personal and professional informations to complete your
            profile
          </p>
          <p className="text-lg text-left font-medium py-2 sm:text-md">
            Personal Informations
          </p>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  name="firstName"
                  placeholder="John"
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
                  placeholder="Doe"
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.lastName}
                  </span>
                )}
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
                onChange={handleChange}
              />

              {errors.address && (
                <span className="text-red-500 flex justify-start text-sm">
                  {errors.address}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="flex justify-start">
                Gender*
              </Label>
              <Select
                id="gender"
                name="gender"
                onValueChange={handleGenderChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.gender && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.gender}
                </span>
              )}
            </div>
          </div>

          <p className="text-lg text-left font-medium py-2 sm:text-md mt-4">
            Professional Informations
          </p>
          <div className="grid gap-4  text-left">
            <div className="space-y-2">
              <Label htmlFor="specialty">Speciality*</Label>
              <Input
                id="specialty"
                name="speciality"
                placeholder="Internal Medicine"
                onChange={handleChange}
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
                id="experience"
                name="experience"
                placeholder="10"
                type="number"
                onChange={handleChange}
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
                id="price"
                name="price"
                placeholder="100"
                type="number"
                onChange={handleChange}
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
                name="bio"
                id="bio"
                placeholder={
                  accountType === "Doctor"
                    ? "Tell us about yourself"
                    : "Tell us about your company"
                }
                onChange={handleChange}
              />
              {errors.bio && (
                <span className="text-red-500 flex justify-start text-sm">
                  {errors.bio}
                </span>
              )}
            </div>
          </div>
          <Button
            className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b] mt-3 w-full"
            onClick={handleSubmitForm2}
          >
            Finish
          </Button>
        </div>
      </>
    );
  };

  const CompleteProfileFormCompany = () => {
    const [auxFormData, setAuxFormData] = useState({});
    const handleChange = (e) => {
      setAuxFormData({
        ...auxFormData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmitForm3 = () => {
      console.log(auxFormData);
      // const validation = validateForm1(auxFormData, accountType);
      // setErrors(validation);

      // if (Object.keys(validation).length === 0) {
      //   setFormData({ ...auxFormData });
      //   handleNext();
      // }
    };
    return (
      <>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Complete Your {accountType} Profile
        </h1>
        <div>
          <p className="mt-2 text-gray-500 ">
            Enhance Your {accountType}'s Presence with Detailed Informations
          </p>
          <p className="text-lg text-left font-medium py-2 sm:text-md">
            {accountType} Informations
          </p>
          <div className="grid gap-4 text-left">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, Anytown USA"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your company"
                name="description"
                onChange={handleChange}
              />
            </div>
          </div>
          <Button
            className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b] mt-3 w-full"
            onClick={handleSubmitForm3}
          >
            Finish
          </Button>
        </div>
      </>
    );
  };

  const ReviewAccountDoctor = () => {
    return (
      <>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Review and Create Account
        </h1>
        <div>
          <p className="mt-2 text-gray-500 ">
            Review your information and create your doctor account.
          </p>
          <div className="text-left">
            <div className="text-lg font-medium">Review Information</div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500">CIN:</span>
                  <p>123456789</p>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p>john@example.com</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500">Last Name:</span>
                  <p>Doe</p>
                </div>
                <div>
                  <span className="text-gray-500">First Name:</span>
                  <p>John</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500">Address:</span>
                  <p>123 Main St, Anytown USA</p>
                </div>
                <div>
                  <span className="text-gray-500">Gender:</span>
                  <p>Male</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500">Specialty:</span>
                  <p>Internal Medicine</p>
                </div>
                <div>
                  <span className="text-gray-500">Experience:</span>
                  <p>10 years</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500">Bio:</span>
                  <p>I have 10 years of experience in the medical field.</p>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>
                  <p>$100</p>
                </div>
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
            <Button className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b]">
              Create Account
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex  w-full  justify-center pt-14 bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] to-white text-[#272643]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <Progress value={currentForm * 20} className="h-3" />
        <div className="text-sm text-gray-500 flex justify-end pb-2">
          Step {currentForm} of 5
        </div>

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
          {currentForm === 4 && accountType === "Doctor" && (
            <motion.div
              key="completeProfileDoctor"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <CompleteProfileFormDoctor />
            </motion.div>
          )}
          {currentForm === 4 && accountType !== "Doctor" && (
            <motion.div
              key="completeProfileDoctor"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <CompleteProfileFormCompany />
            </motion.div>
          )}
          {currentForm === 5 && (
            <motion.div
              key="reviewAccount"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <ReviewAccount />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
