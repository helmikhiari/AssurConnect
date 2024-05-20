import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useRef, useState } from "react";
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
import { motion } from "framer-motion";
import {
  validateForm1,
  validateFormCompany,
  validateFormDoctor,
} from "../../assets/validations";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  checkMail,
  sendOtp,
  signUp,
  verifyCIN,
  verifyOtp,
} from "../../assets/Apis/assets";
import Modal from "../../components/modal";
import { userContext } from "../../Context/userContext";
import Loading from "../../components/loading";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { activeProfile } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] = useState(null);
  const [currentForm, setCurrentForm] = useState(1);
  const navigate = useNavigate();
  const formData = useRef({});
  const handleChange = (e) => {
    formData.current[e.target.name] = e.target.value;
  };

  const redirect = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (activeProfile != null) {
      if (activeProfile.data) {
        navigate("/dashboard");
      } else {
        setLoading(false);
      }
    }
  }, [activeProfile]);
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
    const [errors, setErrors] = useState({});

    const handleSubmitForm1 = async () => {
      const validation = validateForm1(formData.current, accountType);
      setErrors(validation);
      if (Object.keys(validation).length === 0) {
        if (accountType == "Doctor") {
          const response = await verifyCIN(formData.current.cin);
          if (response.data) {
            setErrors((prev) => ({ ...prev, cin: "CIN Already Used" }));
            return;
          }
        }
        if (await checkMail(formData.current.email)) {
          setErrors((prev) => ({ ...prev, email: "Email already used" }));
        } else {
          await sendOtp(formData.current.email);
          handleNext();
        }
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
                    name="name"
                    placeholder="DunDill"
                    defaultValue={formData.current.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="text-red-500 flex justify-start text-sm ">
                      {errors.name}
                    </span>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="cin" className="flex justify-start">
                    CIN*
                  </Label>
                  <Input
                    name="cin"
                    id="cin"
                    placeholder="12345678"
                    defaultValue={formData.current.cin}
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
                  type="email"
                  onChange={handleChange}
                  defaultValue={formData.current.email}
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
                  defaultValue={formData.current.password}
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
                  defaultValue={formData.current.confirmPassword}
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
    const inputRef = useRef(null);
    const [errors, setErrors] = useState({});
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

    const verifycode = async () => {
      const response = await verifyOtp(formData.current.email, otp);
      if (response) {
        handleNext();
      } else {
        setErrors({ otp: "Verify your code" });
      }
    };

    const resendOtp = async () => {
      const response = await sendOtp(formData.current.email);
    };

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
              {errors.otp && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.otp}
                </span>
              )}
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
                  onClick={verifycode}
                >
                  Verify
                </Button>
              </div>
              <div className="flex justify-center">
                <Button
                  className="w-full rounded-lg bg-gray-100 py-3 font-medium text-[#272643] hover:bg-gray-200"
                  variant="outline"
                  onClick={resendOtp}
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
    const [errors, setErrors] = useState({});

    const handleSubmitFormDcotor = () => {
      const validation = validateFormDoctor(formData.current, accountType);
      setErrors(validation);
      if (Object.keys(validation).length === 0) {
        handleNext();
      }
    };

    const handleGenderChange = (e) => {
      formData.current["gender"] = e;
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
                  defaultValue={formData.current.firstName}
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
                  defaultValue={formData.current.lastName}
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
                defaultValue={formData.current.address}
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
                defaultValue={formData.current.gender}
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
                defaultValue={formData.current.speciality}
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
                defaultValue={formData.current.experience}
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
                defaultValue={formData.current.price}
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
                placeholder="Tell us about yourself"
                onChange={handleChange}
                defaultValue={formData.current.bio}
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
            onClick={handleSubmitFormDcotor}
          >
            Finish
          </Button>
        </div>
      </>
    );
  };

  const CompleteProfileFormCompany = () => {
    const [errors, setErrors] = useState({});
    const handleSubmitFormCompany = () => {
      const validation = validateFormCompany(formData.current, accountType);
      setErrors(validation);
      if (Object.keys(validation).length === 0) {
        handleNext();
      }
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
                defaultValue={formData.current.address}
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
                id="description"
                placeholder="Tell us about your company"
                name="description"
                onChange={handleChange}
                defaultValue={formData.current.description}
              />
              {errors.description && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.description}
                </span>
              )}
            </div>
          </div>
          <Button
            className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b] mt-3 w-full"
            onClick={handleSubmitFormCompany}
          >
            Finish
          </Button>
        </div>
      </>
    );
  };

  const ReviewAccount = () => {
    const doctor = accountType === "Doctor";
    const data = formData.current;

    const createAccount = async () => {
      const response = await signUp(data, accountType);
      if (response) {
        console.log("Account Created");
        handleNext();
      } else {
        console.log("problem occured");
      }
    };
    const Cols2 = ({ title1, content1, title2, content2 }) => {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500">{title1}</span>
            <p>{content1}</p>
          </div>
          {title2 && (
            <div>
              <span className="text-gray-500">{title2}</span>
              <p>{content2}</p>
            </div>
          )}
        </div>
      );
    };
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
              {doctor && (
                <>
                  <Cols2
                    title1={"CIN :"}
                    content1={data.cin}
                    title2={"Email :"}
                    content2={data.email}
                  />
                  <Cols2
                    title1={"Last Name :"}
                    content1={data.lastName}
                    title2={"First Name :"}
                    content2={data.firstName}
                  />
                  <Cols2
                    title1={"Address :"}
                    content1={data.address}
                    title2={"Gender :"}
                    content2={data.gender}
                  />
                  <Cols2
                    title1={"Speciality :"}
                    content1={data.speciality}
                    title2={"Experience :"}
                    content2={data.experience}
                  />
                  <Cols2
                    title1={"Price :"}
                    content1={data.price}
                    title2={"Bio :"}
                    content2={data.bio}
                  />
                </>
              )}

              {!doctor && (
                <>
                  <Cols2
                    title1={accountType + " Name :"}
                    content1={data.name}
                    title2={"Email :"}
                    content2={data.email}
                  />
                  <Cols2
                    title1={"Address :"}
                    content1={data.address}
                    title2={"Description :"}
                    content2={data.description}
                  />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <Button
              className="w-full rounded-lg bg-gray-100 py-3 font-medium text-[#272643] hover:bg-gray-200"
              variant="outline"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              className="w-full rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b]"
              onClick={createAccount}
            >
              Create Account
            </Button>
          </div>
        </div>
      </>
    );
  };

  return !loading ? (
    <div className="flex  w-full  justify-center pt-14 bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] to-white text-[#272643]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <Progress value={100 / (7 - currentForm)} className="h-3" />
        <div className="text-sm text-gray-500 flex justify-end pb-2">
          Step {currentForm} of 6
        </div>

        <div>
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
              key="completeProfileCompany"
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
          {currentForm === 6 && (
            <motion.div
              key="succes"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <Modal
                title="Account Created"
                content={
                  "Your " +
                  accountType +
                  " account has been successfully created. You can now access your account and start using our services."
                }
                buttonTitle="Go to Login"
                onClick={redirect}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
