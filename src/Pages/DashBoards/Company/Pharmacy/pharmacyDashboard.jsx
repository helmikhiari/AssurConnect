import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
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
import {
  checkMail,
  confimServe,
  getPrescription,
  serve,
} from "../../../../assets/Apis/assets";
import { isPositiveInteger, isValidPrice } from "../../../../assets/functions";
import classNames from "classnames";
import { API_BASE } from "../../../../../env";
import AlertModal from "../../../../components/alertModal";
import { LineChart } from "@mui/x-charts";
import { data } from "autoprefixer";
let checkedMeds = [];
function PharmacyDashboard() {
  const [disableCheckBox, setDisableCheckBox] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [prescription, setPrescription] = useState();
  const [success, setSuccess] = useState(false);
  const [sessionToken, setSessionToken] = useState();
  const token = localStorage.getItem("token");
  
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);


  const handleClose = () => {
    setPrescription(null);
    setSessionToken(null);
    setSuccess(false);
    toogleDisableCheckBox();
    toogleShowOTP();
  };

  const toogleShowOTP = () => {
    setShowOTP((prev) => !prev);
  };
  const toogleDisableCheckBox = () => setDisableCheckBox((prev) => !prev);

  const handleChanges = () => {
    toogleDisableCheckBox();
    toogleShowOTP();
    setSessionToken(null);
  };

  const Medicine = ({ data, id }) => {
    const [isChecked, setIsChecked] = useState(checkedMeds.includes(id));
    const [disable, setDisable] = useState(false);
    useEffect(() => {
      if (data.served === "Served") {
        setIsChecked(true);
        setDisable(true);
      }
    }, []);

    const handleDivClick = () => {
      if (!disableCheckBox && !disable) {
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
    };
    return (
      <div
        className="flex items-center justify-center bg-white cursor-pointer p-1"
        onClick={handleDivClick}
      >
        <Checkbox
          className="w-5 h-5 data-[state=checked]:bg-darkblue "
          id={id}
          checked={isChecked}
          disabled={disableCheckBox || disable}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-[100%]">
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

          <Separator className="col-span-3 mt-4" />
        </div>
      </div>
    );
  };

  const Prescription = () => {
    const [OTP, setOTP] = useState();
    const [errors, setErrors] = useState({});
    const handleOTPChange = (value) => {
      setOTP(value);
    };
    const [price, setPrice] = useState("");
    const handlePriceChange = (e) => {
      if (isValidPrice(e.target.value) || e.target.value == "") {
        setPrice(e.target.value);
      }
    };

    const handleClear = () => setPrescription(null);
    const handleServe = async () => {
      toogleDisableCheckBox();
      toogleShowOTP();
      const response = await serve(
        token,
        prescription.prescription._id,
        price,
        checkedMeds
      );
      if (response.error) {
        setErrors(response);
      } else if (response) setSessionToken(response);
    };

    const handleConfirmServe = async () => {
      console.log(sessionToken);
      const response = await confimServe(sessionToken, OTP);
      if (!response.error) setSuccess(true);
      else setErrors(response);
    };

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
          <div className="grid grid-cols-1 gap-0 space-y-2 md:space-y-2">
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
            <div className="flex justify-between w-full gap-3 items-center flex-wrap">
              {errors.error && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.error}
                </span>
              )}
              <div className="flex flex-row items-center gap-6">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  onChange={handlePriceChange}
                  className="w-auto"
                  value={price}
                />
              </div>
              <div className="flex gap-6">
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
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center flex-wrap w-full">
              <Button variant="destructive" onClick={handleChanges}>
                Cancel
              </Button>
              <div className="flex flex-row gap-4 items-center flex-wrap">
                <p className="font-medium text-gray-700">Verification Code</p>
                <InputOTP
                  maxLength={5}
                  className="flex flex-wrap"
                  onChange={handleOTPChange}
                  value={OTP}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-8 h-8" />
                    <InputOTPSlot index={1} className="w-8 h-8" />
                    <InputOTPSlot index={2} className="w-8 h-8" />
                    <InputOTPSlot index={3} className="w-8 h-8" />
                  </InputOTPGroup>
                </InputOTP>
                <Button onClick={handleConfirmServe}>Confirm</Button>
              </div>
              {errors.error && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.error}
                </span>
              )}
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
      setShowOTP(false);
      setDisableCheckBox(false);
      checkedMeds = [];
      checkedMeds = [];
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
        {errors ? (
          <span className="text-red-500 flex justify-start text-sm ">
            {errors}
          </span>
        ) : (
          <Card className="mt-6">{prescription ? <Prescription /> : null}</Card>
        )}
      </div>
    );
  };
  const pData = [7000, 9500, 8000, 10500, 9200, 7500, 8500,5000,7000,7900,8900,10000]; // Pharmacy earnings for user 2
  const xLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
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
        <LineChart
 series={[
  { data: pData, label: 'Earnings',color:"#272643",area:true },
]}
xAxis={[{ scaleType: 'point', data: xLabels }]}
  
  width={width-width*0.2}
  height={300}
/>
        <AlertModal
          title={"Prescription successfully served! "}
          buttonTitle={"DISMISS"}
          content={
            "Another one checked off the list. Keep up the excellent work!"
          }
          onClick={handleClose}
          open={success}
        />
      </main>
    </div>
  );
}

export default PharmacyDashboard;
