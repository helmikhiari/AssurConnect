import { Textarea } from "@/components/ui/textarea";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTPSlot,
  InputOTPGroup,
  InputOTP,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { makeApp } from "../../../assets/Apis/assets";
const medicines = new Array();
export default function MakeApp() {
  const [patientData, setPatientData] = useState();
  const [numberOfMedicines, setNumberOfMedicines] = useState(0);
  const [notes, setNotes] = useState();
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState(null);
  const location = useLocation();
  const token = localStorage.getItem("token");
  console.log(location)
  const navigate = useNavigate();
  const changeNotes = (e) => setNotes(e.target.value);
  const changeOTP = (value) => {
    setOtp(value);
  };
  const addMedicine = () => {
    setNumberOfMedicines((prev) => prev + 1);
    medicines.push({ name: "", dosage: "", instruction: "" });
  };
  const deleteMedicine = () => {
    setNumberOfMedicines((prev) => prev - 1);
    medicines.pop();
  };
  useEffect(() => {
    setPatientData(location.state);
  }, []);

  const endAppointement = async () => {
    const response = await makeApp(
      token,
      patientData._id,
      otp,
      notes,
      medicines
    );
    if (response) {
      navigate("/dashboard");
    } else if (response === false) {
      setOtpError("Please verify your code");
    }
  };
  const Medicine = ({ index }) => {
    const handleChange = (e) => {
      medicines[index][e.target.name] = e.target.value;
    };
    return (
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="medicine-name">Medicine Name</Label>
          <Input
            id="medicine-name"
            name="name"
            placeholder="Amoxicillin"
            onChange={handleChange}
            defaultValue={medicines[index].name}
          />
        </div>
        <div>
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            name="dosage"
            placeholder="500mg"
            onChange={handleChange}
            defaultValue={medicines[index].dosage}
          />
        </div>
        <div>
          <Label htmlFor="instructions">Instructions</Label>
          <Input
            id="instructions"
            name="instruction"
            placeholder="Take 2 times a day"
            onChange={handleChange}
            defaultValue={medicines[index].instruction}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full mx-auto py-2 px-4 md:px-6 lg:px-8 text-left">
      <div className="grid  h-[80%] grid-cols-1 md:grid-cols-2 gap-8 ">
        <div>
          <h1 className="text-2xl font-bold">Appointment In Progress</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Providing care for the patient.
          </p>
        </div>
        <Card className="flex flex-row flex-wrap gap-6 max-h-[100px] items-center px-3 py-1 max-w-[250px] shadow hover: bg-darkblue">
          <Avatar className="h-[70px] w-[70px]">
            <AvatarImage src={patientData?.patientPicture} />
            <AvatarFallback>
              {patientData?.patientFirstName[0] +
                patientData?.patientLastName[0]}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-md capitalize text-gray-300">
            {patientData?.patientLastName} {patientData?.patientFirstName}
          </p>
        </Card>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-center">Prescription</h2>
              <div className="space-y-4 pt-2">
                {numberOfMedicines != 0 && (
                  <Card className="space-y-2 p-3 shadow-md bg-white">
                    {Array.from({ length: numberOfMedicines }).map(
                      (_, index) => (
                        <Medicine key={index} index={index} />
                      )
                    )}
                  </Card>
                )}
                <div className="flex justify-center gap-10">
                  <Button
                    variant="outline"
                    className="bg-red-400 hover:bg-red-500"
                    onClick={deleteMedicine}
                  >
                    Delete Medicine
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-green-400 hover:bg-green-500"
                    onClick={addMedicine}
                  >
                    Add Medicine
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  justify-between space-y-6">
          <div>
            <h2 className="text-lg font-medium">Notes</h2>
            <Textarea
              className="mt-2 h-32"
              placeholder="Enter notes about the appointment..."
              defaultValue={notes}
              onChange={changeNotes}
            />
          </div>

          <div className="flex flex-row gap-8">
            <h2 className="text-lg font-medium self-center">Code</h2>
            <InputOTP maxLength={6} value={otp} onChange={changeOTP}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
            {otpError && (
              <span className="text-red-500 flex justify-start text-sm ">
                {otpError}
              </span>
            )}
            <Button
              className="w-full bg-darkblue hover:bg-black"
              onClick={endAppointement}
            >
              End Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
