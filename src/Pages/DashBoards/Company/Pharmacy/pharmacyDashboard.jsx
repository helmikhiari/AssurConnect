import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  ClipboardIcon,
  DollarSignIcon,
  PillIcon,
  SearchIcon,
  XIcon,
} from "../../../../assets/icons/icons";
import DashboardCard from "../../../../components/dashboardCard";
import { checkMail, getPrescription } from "../../../../assets/Apis/assets";
import { isPositiveInteger } from "../../../../assets/functions";
const checkedMeds = [];
function PharmacyDashboard() {
  const [disableCheckBox, setDisableCheckBox] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [prescription, setPrescription] = useState();
  const token = localStorage.getItem("token");
  console.log(checkedMeds);
  const toogleShowOTP = () => setShowOTP((prev) => !prev);
  const toogleDisableCheckBox = () => setDisableCheckBox((prev) => !prev);

  const handleServe = () => {
    toogleDisableCheckBox();
    toogleShowOTP();
  };

  const Medicine = ({ data, id }) => {
    const [isChecked, setIsChecked] = useState(checkedMeds.includes(id));
    const handleDivClick = () => {
      if (!disableCheckBox) {
        setIsChecked((prev) => {
          const newCheckedState = !prev;
          handleMedCheck(newCheckedState);
          return newCheckedState;
        });
      }
    };

    const handleMedCheck = (checked) => {
      if (checked && !checkedMeds.includes(id)) checkedMeds.push(id);
      else if (!checked) {
        checkedMeds.splice(checkedMeds.indexOf(id), 1);
      }
      console.log(checkedMeds);
    };
    return (
      <div
        className="flex items-center justify-center"
        onClick={handleDivClick}
      >
        <Checkbox
          className="w-5 h-5"
          id={id}
          checked={isChecked}
          disabled={disableCheckBox}
        />
        <div className="flex flex-row w-[100%] items-center justify-around flex-wrap">
          <div>
            <div className="font-medium">Medication</div>
            <div className="text-gray-500">{data.name}</div>
          </div>
          <div>
            <div className="font-medium">Dosage</div>
            <div className="text-gray-500">{data.dosage}</div>
          </div>
          <div>
            <div className="font-medium">Notes</div>
            <div className="text-gray-500">{data.instruction}</div>
          </div>
          <Separator className="mt-4" />
        </div>
      </div>
    );
  };

  const Prescription = () => {
    const [OTP, setOTP] = useState();
    const handleOTPChange = (value) => {
      setOTP(value);
    };
    const handleClear = () => setPrescription(null);
    return (
      <>
        <CardHeader className="flex flex-row items-center justify-between pb-2 ">
          <CardTitle className="self-start">Prescription Details</CardTitle>
          <div>
            <p className=" flex flex-row gap-3 items-center text-blue-900 font-medium ">
              <Avatar className="h-12 w-12">
                <AvatarImage src={prescription.doctorPicture} />
                <AvatarFallback>
                  {prescription?.doctorFirstName[0]}
                  {prescription.doctorLastName[0]}
                </AvatarFallback>
              </Avatar>
              {prescription?.doctorFirstName} {prescription.doctorLastName}
            </p>
            {/* <p className=" text-blue-900 text-sm text-center">
              {pre}
            </p> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 space-y-3">
            <div className=" flex flex-col items-start gap-3">
              <p className="font-medium">Patient</p>
              <div className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={prescription.patientPicturee} />
                  <AvatarFallback className="uppercase">
                    {prescription?.patientFirstName[0]}
                    {prescription.patientLastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-500 capitalize">
                  {prescription?.patientFirstName}{" "}
                  {prescription.patientLastName}
                </p>
              </div>
            </div>
            {prescription.prescription.medicines?.map((med, index) => {
              return <Medicine data={med} id={med._id} key={index} />;
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {!showOTP ? (
            <>
              <Button variant="destructive" onClick={handleClear}>
                <XIcon className="w-4 h-4 mr-2 text-white" />
                Clear
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 "
                onClick={handleServe}
              >
                <PillIcon className="w-4 h-4 mr-2 text-white" />
                Serve
              </Button>
            </>
          ) : (
            <div className="flex justify-center flex-wrap">
              <InputOTP
                maxLength={5}
                className="flex flex-wrap"
                onChange={handleOTPChange}
                value={OTP}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>
              <Button>Confirm</Button>
            </div>
          )}
        </CardFooter>
      </>
    );
  };

  const PrescriptionLookup = () => {
    const [prescriptionID, setPrescriptionID] = useState("");
    const [errors, setErrors] = useState();

    const getPres = async (e) => {
      e.preventDefault();
      const response = await getPrescription(prescriptionID, token);

      response.data
        ? setPrescription(response.data)
        : setErrors(response.error);
    };

    const handleFocus = (e) => {
      if (!e.target.value) setPrescriptionID("#");
    };
    const handleBlur = (e) => {
      if (e.target.value === "#") setPrescriptionID("");
    };

    const changePrescriptionId = (e) => {
      if (e.target.value != "#") {
        const a = e.target.value.slice(1);

        if (isPositiveInteger(a)) setPrescriptionID(e.target.value);
      } else setPrescriptionID("#");
    };
    return (
      <div className="bg-white rounded-lg shadow-md p-6 min-w-[350px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Prescription Lookup</h2>
          <SearchIcon className="w-6 h-6 text-[#272643]" />
        </div>
        <form className="mb-1 flex items-center" onSubmit={getPres}>
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pl-8 w-full"
              placeholder="# Enter prescription code or number"
              type="text"
              value={prescriptionID}
              onChange={changePrescriptionId}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <Button className="ml-4" variant="outline" type="submit">
            Look up
          </Button>
        </form>
        {errors && (
          <span className="text-red-500 flex justify-start text-sm ">
            {errors}
          </span>
        )}
        <Card className="mt-6">{prescription ? <Prescription /> : null}</Card>
      </div>
    );
  };

  return (
    <div>
      <main className="flex-1  p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          <DashboardCard
            title="Montly Prescriptions Served"
            number="200"
            subNumber="+30 this week"
          >
            <ClipboardIcon className="w-4 h-4 text-darkblue" />
          </DashboardCard>
          <DashboardCard
            title="Monthly Earnings"
            number="3700.25 "
            subNumber="+35% this month"
          >
            <DollarSignIcon className="w-4 h-4 text-darkblue" />
          </DashboardCard>
          <DashboardCard
            title="Total Prescriptions"
            number="5200"
            subNumber="+7% from last month"
          >
            <ClipboardIcon className="w-4 h-4 text-darkblue" />
          </DashboardCard>
        </div>
        <PrescriptionLookup />
      </main>
    </div>
  );
}

export default PharmacyDashboard;
