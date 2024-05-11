import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { validateDataCompany } from "../../assets/validation";

export default function Signup() {
  const [accountType, setAccountType] = useState(null);
  const [currentForm, setCurrentForm] = useState(1);
  const handleAccountTypeChange = (type) => setAccountType(type);
  const handleNext = () => setCurrentForm((prev) => prev + 1);
  const handleBack = () => setCurrentForm((prev) => prev - 1);

  const InitialForm = () => {
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
    let initialFormData;
    if (accountType === "Doctor") {
      initialFormData = {
        cin: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    } else {
      initialFormData = {
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    }

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = () => {
      const validation = validateDataCompany(formData, accountType);
      setErrors(validation);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="mt-2 text-gray-500">
            {accountType == "Doctor" ? (
              <p>Enter your personal informations</p>
            ) : (
              <p>Enter your {accountType} informations</p>
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
            onClick={handleSubmit}
            className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b]"
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  const FinalForm = () => {
    return (
      <div>
        <div className="space-y-2">
          <Label htmlFor="address" className="flex justify-start">
            Address*
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main St, Anytown USA"
            required
            onChange={handleChange}
          />
          {errors.address && (
            <span className="text-red-500 flex justify-start text-sm">
              {errors.address}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="flex justify-start">
            Bio*
          </Label>
          <Textarea
            name="bio"
            id="bio"
            placeholder="Tell us about your company"
            required
            onChange={handleChange}
          />
          {errors.bio && (
            <span className="text-red-500 flex justify-start text-sm">
              {errors.bio}
            </span>
          )}
        </div>
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
        <AnimatePresence wait>
          {currentForm === 1 ? (
            <motion.div
              key="initialForm"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <InitialForm />
            </motion.div>
          ) : (
            <motion.div
              key="formCompanyDoctor"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <FormCompanyDoctor />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
